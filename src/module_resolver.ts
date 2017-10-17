/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import {checkClassHasDecoratorType, ThModule} from "./metadata";
import {Reflection} from "./metadata/reflection";
import {resolveDeps, stringify} from "./util";
import {InjectorBranch, InjectorBranch_} from "./di/injector_tree";
import * as express from "express";
import {ExpressController} from "./controllers/express_controller";
import {Router} from "express";
import {isClass} from "./util";
import {ThMiddlewareImplements} from "./metadata/th_middleware";
import {MainApplication} from "./main_application";
import {InjectorToken} from "./di/injector_token";


/**
 * Responsible to compile and manage all modules.
 */
export abstract class ModuleResolver {
    abstract getInjectorTree(): InjectorBranch;
    abstract getParent(): ModuleResolver|null;
    abstract getRouter(): Router;
    abstract getChildren(cls: any): ModuleResolver|null;
    abstract getChildren<T>(cls: T): T;
    abstract getModuleInstance(): any;
    abstract getModule(): any;
    static create(module: any, parent?: ModuleResolver, extraControllers?: any[]): ModuleResolver {
        return new ModuleResolver_(module, parent, extraControllers);
    }
}


/**
 * @internal
 * @hidden
 */
class ModuleResolver_ extends ModuleResolver {

    childrens: ModuleResolver[] = [];
    injectorTree: InjectorBranch_;
    metadata: ModuleMetadata;
    parent: ModuleResolver_|null;
    instance: any;
    routersCache: any[] = [];
    router: any = express.Router();
    middlewaresCache: any[] = [];

    constructor(private module: any, parent?: ModuleResolver, extraControllers: any[] = []) {
        super();
        const decorators = Reflection.decorators(this.module);
        if (decorators.length !== 1 || stringify(decorators[0]) !== "ThModule") {
            _throwInvalid('ThModule', this.module);
        }
        this.parent = (parent as ModuleResolver_) || null;
        this.metadata = new ModuleMetadata(decorators[0].metadata);
        this.metadata._controllers.push(...extraControllers);
        this.injectorTree = new InjectorBranch_(this);


        if (!this._isMainApplication()) {
            MainApplication.getChildResolvers().set(this.module, this);
        }

        this.normalizeControllersAndModels();
        this.resolveImports();
        this.resolveExports();
        this.resolveMiddlewares();
        this.resolveRouters();
        this.applyRouter();
        this.resolveInstance();
    }

    normalizeControllersAndModels() {
        const controllers = this.metadata._controllers;
        const models = this.metadata._models;
        const normalizedControllers = _normalizeDependencies(controllers, "ThController");
        const normalizedModels      = _normalizeDependencies(models, "ThModel");
        this.injectorTree._dependencies = [...normalizedControllers, ...normalizedModels];
    }

    resolveImports() {
        const imports = this.metadata._imports;
        if (!imports) {
            return;
        }
        for(const module of imports) {
            if (!checkClassHasDecoratorType('ThModule', module)) {
                _throwInvalid('ThModule', module);
            }
            let resolvedModule: ModuleResolver_;
            if (MainApplication.getChildResolvers().has(module)) {
                resolvedModule = MainApplication.getChildResolvers().get(module) as any;
            }
            else {
                resolvedModule = new ModuleResolver_(module, this);
            }
            this.childrens.push(resolvedModule);
            const moduleInjectorTree = resolvedModule.injectorTree;
            const exports = resolvedModule.metadata._exports;
            for (const exp of exports) {
                const instance = moduleInjectorTree.get(exp);
                this.injectorTree.pushResolved(exp, instance);
            }
        }
    }

    resolveMiddlewares() {
        const middlewares = this.metadata._middlewares;
        if (!middlewares) {
            return;
        }
        middlewares.forEach((md: any) => {
            if (!isClass(md)) {
                this.router.use(md);
                return;
            }
            if (!checkClassHasDecoratorType('ThMiddleware', md)) {
                _throwInvalid('ThMiddleware', md);
            }
            const instance = <ThMiddlewareImplements>resolveDeps(md, this.injectorTree);
            if (typeof instance.handler !== "function") {
                _throwInvalid('ThMiddlewareImplements', md);
            }
            this.middlewaresCache.push(instance);
            this.router.use((...args: any[]) => (<any>instance.handler)(...args));
        });
    }

    resolveRouters() {
        const routers = this.metadata._routers || [];
        const resolvedRouters = routers.map((router: any) => {
            if (!checkClassHasDecoratorType('ThRouter', router)) {
                _throwInvalid("ThRouter", router);
            }
            const instance = resolveDeps(router, this.injectorTree);
            const basePath = Reflection.decorators(router)[0].metadata || '';
            const prototype = Object.getPrototypeOf(instance);
            const decorators = Reflection.decorators(prototype);
            this.routersCache.push(instance);
            _wrapMethodsInRouter(basePath, instance, decorators, this.router);
        });
        this.routersCache = resolvedRouters;
    }

    resolveInstance() {
        this.instance = resolveDeps(this.module, this.injectorTree);
        this.injectorTree.pushResolved(this.module, this.instance);
    }

    resolveExports() {
        const exports = this.metadata._exports;
        if (!exports) {
            return;
        }
        if (!exports.length) {
            return;
        }
        for (const exp of exports) {
            if (!(this.injectorTree.isDeclared(exp))) {
                throw new Error(
                    `To ${stringify(exp)} can be exported, he need to be declared.`
                )
            }
        }
    }

    applyRouter() {
        const basePath = this.metadata._basePath || '/';

        if (this._isMainApplication()) {
            return;
        }

        if (this.parent) {
            if (!this.parent._isMainApplication()) {
                this.parent.getRouter().use(basePath, this.router);
                return;
            }
        }

        const expressController = <ExpressController>this.injectorTree.get(ExpressController);
        if (expressController) {
            const expressApp = expressController.getApp();
            expressApp.use(basePath, this.router);
        }
    }

    _isMainApplication(): boolean {
        return this.module === MainApplication;
    }

    getParent() {
        return this.parent;
    }

    getInjectorTree() {
        return this.injectorTree;
    }

    getRouter(): any {
        return this.router;
    }

    getChildren(cls: any): any {
        return this.childrens.find((m: ModuleResolver_) => m.module === cls);
    }

    getModuleInstance(): any {
        return this.instance;
    }

    getModule(): any {
        return this.module;
    }

}


/**
 * @internal
 * @hidden
 */
export class ModuleMetadata {
    _controllers: any[];
    _models: any[];
    _basePath: string|null;
    _middlewares: any[]|null;
    _imports: any[]|null;
    _routers: any[]|null;
    _exports: any[];

    constructor({controllers, basePath, middlewares, imports, routers, models, exports}: ThModule) {
        this._controllers = controllers || [];
        this._models = models || [];
        this._routers = routers || null;
        this._middlewares = middlewares || null;
        this._basePath = basePath || null;
        this._imports = imports || null;
        this._exports = exports || [];
    }
}

/**
 * @internal
 * @hidden
 * @type {[string , string , string , string , string , string]}
 */
const httpMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'PARAM'];

/**
 * @internal
 * @hidden
 * @param {string} basePath
 * @param instance
 * @param {any[]} decorators
 * @param {e.Router} router
 * @private
 */
function _wrapMethodsInRouter(basePath: string, instance: any, decorators: any[], router: express.Router) {
    for (const decorator of decorators) {
        const httpMethod = decorator.name;
        const methodName = decorator.metadata.method;
        const args = decorator.metadata.args;
        const path = args[0] || '';
        const callerArgs = [`${basePath}${path}`, _wrapRouterHandlerInMethod(instance, methodName)];
        if (httpMethods.indexOf(httpMethod) == -1) {
            throw new Error(`Invalid http method at ${instance.constructor.name}.${methodName}`);
        }
        if (httpMethod === "PARAM") {
            router.param(path.toLowerCase(), _wrapRouterHandlerInMethod(instance, methodName));
        } else {
            (<any>router)[httpMethod.toLowerCase()](...callerArgs);
        }
    }
}

/**
 * @internal
 * @hidden
 * @param instance
 * @param {string} method
 * @returns (...args: any[]) => any
 * @private
 */
function _wrapRouterHandlerInMethod(instance: any, method: string) {
    return (...args: any[]) => instance[method](...args);
}

/**
 * @internal
 * @hidden
 * @private
 */
function _normalizeDependencies(clss: any[], type: string) {
    return clss.map((cls: any) => {
        if (typeof cls === "function") {
            if (!checkClassHasDecoratorType(type, cls)) {
                _throwInvalid(type, cls);
            }
            return { token: cls, class: cls }
        }
        if (cls.token) {
            const isInjectorToken = cls.token instanceof InjectorToken;
            const isFunction      = typeof cls.token === "function";
            if (!isFunction && !isInjectorToken) {
                _throwInvalid(`${type} Token,`, "must be InjectorToken");
            }
            if (cls.factory && typeof cls.factory !== "function") {
                _throwInvalid(`${type} factory,`, "must be a function");
            }
            if (cls.class && !isClass(cls.class)) {
                _throwInvalid(`${type} class,`, "must be a class");
            }
            return cls;
        }
        _throwInvalid(type, cls);
    })
}

/**
 * @internal
 * @hidden
 * @private
 */
function _throwInvalid(expected: string, cls: any) {
    throw new Error(
        `Invalid ${expected} ${stringify(cls)}.`
    )
}