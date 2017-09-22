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
import {ExpressController} from "./express_controller";
import {RequestHandler, Router} from "express";
import {isClass} from "./util";
import {ThMiddlewareImplements} from "./metadata/th_middleware";

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
    static create(module: any, parent?: ModuleResolver): ModuleResolver {
        return new ModuleResolver_(module, parent);
    }
}


/**
 * @internal
 * @hidden
 */
class ModuleResolver_ extends ModuleResolver {

    childrens: ModuleResolver[] = [];
    injectorTree: InjectorBranch;
    metadata: ModuleMetadata;
    _parent: ModuleResolver|null;
    instance: any;
    routersCache: any[] = [];
    router: any = express.Router();
    middlewaresCache: any[] = [];

    constructor(private module: any, parent?: ModuleResolver) {
        super();
        const decorators = Reflection.decorators(module);
        if (decorators.length !== 1) {
            this._throwInvalid('ThModule', module);
        }
        if (stringify(decorators[0]) !== "ThModule") {
            this._throwInvalid('ThModule', module);
        }
        this.metadata = new ModuleMetadata(decorators[0].metadata);
        this._parent = parent || null;
        this._resolveControllersAndModels();
        this._resolveMiddlewares();
        this._resolveImports();
        this._resolveRouters();
        this._applyRouter();
        this._resolveInstance();
    }

    _resolveControllersAndModels() {
        const controllers = this.metadata._controllers || [];
        for(const controller of controllers) {
            if (!checkClassHasDecoratorType('ThController', controller)) {
                this._throwInvalid('ThController', controller);
            }
        }
        const models = this.metadata._models || [];
        for(const model of models) {
            if (!checkClassHasDecoratorType('ThModel', model)) {
                this._throwInvalid('ThModel', model);
            }
        }

        const parentInject = this._parent ? this._parent.getInjectorTree() : undefined;
        this.injectorTree = new InjectorBranch_([...controllers, ...models], parentInject);
    }

    _resolveImports() {
        const imports = this.metadata._imports;
        if (!imports) {
            return;
        }
        for(let module of imports) {
            let exports;
            if (typeof module.module === "function") {
                if (!Array.isArray(module.exports)) {
                    this._throwInvalid('Module.exports, expect array, received', module.exports);
                }
                exports = module.exports;
                module  = module.module;
            }
            if (!checkClassHasDecoratorType('ThModule', module)) {
                this._throwInvalid('ThModule', module);
            }
            const moduleResolverInstance = new ModuleResolver_(module, this);
            this.childrens.push(moduleResolverInstance);
            if (exports) {
                for (const exp of exports) {
                    const expInstance = moduleResolverInstance.injectorTree.get(exp);
                    (<InjectorBranch_>this.injectorTree).pushResolved(exp, expInstance);
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
        (<InjectorBranch_>this.injectorTree).pushResolved(this.module, this.instance);
    }

    _applyRouter() {

        const basePath = this.metadata._basePath || '/';

        if (this._parent) {
            this._parent.getRouter().use(basePath, this.router);
            return;
        }

        const expressController = <ExpressController>this.injectorTree.get(ExpressController);
        const expressApp = expressController.getApp();
        expressApp.use(basePath, this.router);
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
    _controllers: any[]|null;
    _models: any[]|null;
    _basePath: string|null;
    _middlewares: [ThMiddlewareImplements|RequestHandler]|null;
    _imports: any[]|null;
    _routers: any[]|null;

    constructor({controllers, basePath, middlewares, imports, routers, models}: ThModule) {
        this._controllers = controllers || null;
        this._models = models || null;
        this._routers = routers || null;
        this._middlewares = middlewares || null;
        this._basePath = basePath || null;
        this._imports = imports || null;
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