/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import {checkClassHasDecoratorType, ThModule} from "./metadata";
import {Reflection} from "./util/reflection";
import {stringify} from "./util/stringify";
import {InjectorBranch, InjectorBranch_} from "./di/injector_tree";
import * as express from "express";
import {ExpressController} from "./express_controller";
import {Router} from "express";


export abstract class ModuleResolver {
    abstract getInjectorTree(): InjectorBranch;
    abstract getParent(): ModuleResolver|null;
    abstract getRouter(): Router;
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
        this._resolveImports();
        this._resolveMiddlewares();
        this._resolveRouters();
        this._applyRouter();
        this._resolveInstance();
    }

    _resolveControllersAndModels() {
        const controllers = this.metadata._controllers || [];
        for(const controller of controllers) {
            if (!checkClassHasDecoratorType('Controller', controller)) {
                this._throwInvalid('Controller', controller);
            }
        }
        const models = this.metadata._models || [];
        for(const model of models) {
            if (!checkClassHasDecoratorType('Model', model)) {
                this._throwInvalid('Model', model);
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
        for(const i of imports) {
            if (!checkClassHasDecoratorType('ThModule', i)) {
                this._throwInvalid('ThModule', i);
            }
            this.childrens.push(new ModuleResolver_(i, this));
        }
    }

    _resolveMiddlewares() {
        const middlewares = this.metadata._middlewares;
        if (!middlewares) {
            return;
        }
        middlewares.forEach(m => this.router.use(m));
    }

    _resolveRouters() {
        const routers = this.metadata._routers || [];
        const resolvedRouters = routers.map((router: any) => {
            if (!checkClassHasDecoratorType('Router', router)) {
                this._throwInvalid("Router", router);
            }
            const deps = Reflection.parameters(router);
            const resolvedDeps = deps.map((d: any) => this.injectorTree.get(d));
            const instance = new router(...resolvedDeps);
            const basePath = Reflection.decorators(router)[0].metadata || ('/'+router.name);
            const prototype = Object.getPrototypeOf(instance);
            const decorators = Reflection.decorators(prototype);
            this.routersCache.push(instance);
            _wrapMethodsInRouter(basePath, instance, decorators, this.router);
        });
        this.routersCache = resolvedRouters;
    }

    _resolveInstance() {
        const deps = Reflection.parameters(this.module);
        const resolvedDeps = deps.map((d: any) => this.injectorTree.get(d));
        this.instance = new this.module(...resolvedDeps);
        (<InjectorBranch_>this.injectorTree)._controllers.push(this.module);
        (<InjectorBranch_>this.injectorTree)._controllersCache.set(this.module, this.instance);
    }

    _applyRouter() {

        const basePath = this.metadata._basePath || '/';

        if (this._parent) {
            this._parent.getRouter().use(basePath, this.router);
            return;
        }

        const expressController = this.injectorTree.get<ExpressController>(ExpressController);
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
}


/**
 * @internal
 * @hidden
 */
export class ModuleMetadata {
    _controllers: any[]|null;
    _models: any[]|null;
    _basePath: string|null;
    _middlewares: any[]|null;
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
        (<any>router)[httpMethod.toLowerCase()](...callerArgs);
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