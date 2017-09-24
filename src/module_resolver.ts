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
import {RequestHandler, Router} from "express";
import {isClass} from "./util";
import {ThMiddlewareImplements} from "./metadata/th_middleware";
import {MAIN_CHILD_MODULES, MainApplication} from "./main_application";
import {InjectorToken} from "./di/injector_token";
import {isUndefined} from "util";

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
    _parent: ModuleResolver_|null;
    instance: any;
    routersCache: any[] = [];
    router: any = express.Router();
    middlewaresCache: any[] = [];

    constructor(private module: any, parent?: ModuleResolver, extraControllers?: any[]) {
        super();
        const decorators = Reflection.decorators(this.module);
        if (decorators.length !== 1) {
            this._throwInvalid('ThModule', this.module);
        }
        if (stringify(decorators[0]) !== "ThModule") {
            this._throwInvalid('ThModule', this.module);
        }
        this.metadata = new ModuleMetadata(decorators[0].metadata);
        this.injectorTree = new InjectorBranch_(this);
        this._parent = parent as ModuleResolver_ || null;
        if (Array.isArray(extraControllers)) {
            this.metadata._controllers.push(...extraControllers);
        }
        if (!this._isMainApplication()) {
            MainApplication.getChildResolvers().set(this.module, this);
        }

        this._resolveControllersAndModels();
        this._resolveExports();
        this._resolveMiddlewares();
        this._resolveRouters();
        this._applyRouter();
        this._resolveImports();
        this._resolveInstance();
    }

    _resolveControllersAndModels() {
        const controllers = this.metadata._controllers;
        for(const controller of controllers) {
            const isInjectorToken = controller.token instanceof InjectorToken && !isUndefined(controller.value);
            const isThController  = checkClassHasDecoratorType('ThController', controller);
            if (isInjectorToken) {
                this.injectorTree.pushResolved(controller.token, controller.value);
            }
            else if (isThController) {
                this.injectorTree.pushAndResolve(controller);
            }
            else {
                this._throwInvalid('ThController', controller);
            }
        }
        const models = this.metadata._models;
        for(const model of models) {
            const isInjectorToken = model.token instanceof InjectorToken  && !isUndefined(model.value);
            const isThModel       = checkClassHasDecoratorType('ThModel', model);
            if (isInjectorToken) {
                this.injectorTree.pushResolved(model.token, model.value);
            }
            else if (isThModel) {
                this.injectorTree.pushAndResolve(model);
            }
            else {
                this._throwInvalid('ThModel', model);
            }
        }
    }

    _resolveImports() {
        const imports = this.metadata._imports;
        if (!imports) {
            return;
        }
        for(const module of imports) {
            if (typeof module === "function") {
                if (!checkClassHasDecoratorType('ThModule', module)) {
                    this._throwInvalid('ThModule', module);
                }
                let resolvedModule;
                if (MainApplication.getChildResolvers().has(module)) {
                    resolvedModule = <ModuleResolver_>MainApplication.getChildResolvers().get(module);
                } else {
                    resolvedModule = new ModuleResolver_(module, this);
                    this.childrens.push(resolvedModule);
                }
                const moduleInjectoTree = resolvedModule.injectorTree;
                const exports = resolvedModule.metadata._exports;
                for (const exp of exports) {
                    const instance = moduleInjectoTree.get(exp);
                    this.injectorTree.pushResolved(exp, instance);
                }
            }
        }
    }

    _resolveMiddlewares() {
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
                this._throwInvalid('ThMiddleware', md);
            }
            const instance = <ThMiddlewareImplements>resolveDeps(md, this.injectorTree);
            if (typeof instance.handler !== "function") {
                this._throwInvalid('ThMiddlewareImplements', md);
            }
            this.middlewaresCache.push(instance);
            this.router.use((...args: any[]) => (<any>instance.handler)(...args));
        });
    }

    _resolveRouters() {
        const routers = this.metadata._routers || [];
        const resolvedRouters = routers.map((router: any) => {
            if (!checkClassHasDecoratorType('ThRouter', router)) {
                this._throwInvalid("ThRouter", router);
            }
            const instance = resolveDeps(router, this.injectorTree);
            const basePath = Reflection.decorators(router)[0].metadata || ('/'+router.name);
            const prototype = Object.getPrototypeOf(instance);
            const decorators = Reflection.decorators(prototype);
            this.routersCache.push(instance);
            _wrapMethodsInRouter(basePath, instance, decorators, this.router);
        });
        this.routersCache = resolvedRouters;
    }

    _resolveInstance() {
        this.instance = resolveDeps(this.module, this.injectorTree);
        this.injectorTree.pushResolved(this.module, this.instance);
    }

    _resolveExports() {
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

    _isMainApplication(): boolean {
        return this.module === MainApplication;
    }

    _applyRouter() {
        const basePath = this.metadata._basePath || '/';

        if (this._isMainApplication()) {
            return;
        }

        if (this._parent) {
            if (!this._parent._isMainApplication()) {
                this._parent.getRouter().use(basePath, this.router);
                return;
            }
        }

        const expressController = <ExpressController>this.injectorTree.get(ExpressController);
        if (expressController) {
            const expressApp = expressController.getApp();
            expressApp.use(basePath, this.router);
        }
    }

    _throwInvalid(expected: string, cls: any) {
        throw new Error(
            `Invalid ${expected} ${stringify(cls)}.`
        )
    }

    getParent() {
        return this._parent;
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
        const path = args[0] || methodName;
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