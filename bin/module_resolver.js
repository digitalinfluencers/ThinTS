"use strict";
/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("./metadata");
const reflection_1 = require("./metadata/reflection");
const util_1 = require("./util");
const injector_tree_1 = require("./di/injector_tree");
const express = require("express");
const express_controller_1 = require("./express_controller");
const util_2 = require("./util");
/**
 * Responsible to compile and manage all modules.
 */
class ModuleResolver {
    static create(module, parent) {
        return new ModuleResolver_(module, parent);
    }
}
exports.ModuleResolver = ModuleResolver;
/**
 * @internal
 * @hidden
 */
class ModuleResolver_ extends ModuleResolver {
    constructor(module, parent) {
        super();
        this.module = module;
        this.childrens = [];
        this.routersCache = [];
        this.router = express.Router();
        this.middlewaresCache = [];
        const decorators = reflection_1.Reflection.decorators(module);
        if (decorators.length !== 1) {
            this._throwInvalid('ThModule', module);
        }
        if (util_1.stringify(decorators[0]) !== "ThModule") {
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
        for (const controller of controllers) {
            if (!metadata_1.checkClassHasDecoratorType('ThController', controller)) {
                this._throwInvalid('ThController', controller);
            }
        }
        const models = this.metadata._models || [];
        for (const model of models) {
            if (!metadata_1.checkClassHasDecoratorType('ThModel', model)) {
                this._throwInvalid('ThModel', model);
            }
        }
        const parentInject = this._parent ? this._parent.getInjectorTree() : undefined;
        this.injectorTree = new injector_tree_1.InjectorBranch_([...controllers, ...models], parentInject);
    }
    _resolveImports() {
        const imports = this.metadata._imports;
        if (!imports) {
            return;
        }
        for (const i of imports) {
            if (!metadata_1.checkClassHasDecoratorType('ThModule', i)) {
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
        middlewares.forEach((md) => {
            if (!util_2.isClass(md)) {
                this.router.use(md);
                return;
            }
            if (!metadata_1.checkClassHasDecoratorType('ThMiddleware', md)) {
                this._throwInvalid('ThMiddleware', md);
            }
            const deps = reflection_1.Reflection.parameters(md);
            const resolvedDeps = deps.map((d) => this.injectorTree.get(d));
            const instance = new md(...resolvedDeps);
            if (typeof instance.handler !== "function") {
                this._throwInvalid('ThMiddlewareImplements', md);
            }
            this.middlewaresCache.push(instance);
            this.router.use((...args) => instance.handler(...args));
        });
    }
    _resolveRouters() {
        const routers = this.metadata._routers || [];
        const resolvedRouters = routers.map((router) => {
            if (!metadata_1.checkClassHasDecoratorType('ThRouter', router)) {
                this._throwInvalid("ThRouter", router);
            }
            const deps = reflection_1.Reflection.parameters(router);
            const resolvedDeps = deps.map((d) => this.injectorTree.get(d));
            const instance = new router(...resolvedDeps);
            const basePath = reflection_1.Reflection.decorators(router)[0].metadata || ('/' + router.name);
            const prototype = Object.getPrototypeOf(instance);
            const decorators = reflection_1.Reflection.decorators(prototype);
            this.routersCache.push(instance);
            _wrapMethodsInRouter(basePath, instance, decorators, this.router);
        });
        this.routersCache = resolvedRouters;
    }
    _resolveInstance() {
        const deps = reflection_1.Reflection.parameters(this.module);
        const resolvedDeps = deps.map((d) => this.injectorTree.get(d));
        this.instance = new this.module(...resolvedDeps);
        this.injectorTree._controllers.push(this.module);
        this.injectorTree._controllersCache.set(this.module, this.instance);
    }
    _applyRouter() {
        const basePath = this.metadata._basePath || '/';
        if (this._parent) {
            this._parent.getRouter().use(basePath, this.router);
            return;
        }
        const expressController = this.injectorTree.get(express_controller_1.ExpressController);
        const expressApp = expressController.getApp();
        expressApp.use(basePath, this.router);
    }
    _throwInvalid(expected, cls) {
        throw new Error(`Invalid ${expected} ${util_1.stringify(cls)}.`);
    }
    getParent() {
        return this._parent;
    }
    getInjectorTree() {
        return this.injectorTree;
    }
    getRouter() {
        return this.router;
    }
    getChildren(cls) {
        return this.childrens.find((m) => m.module === cls);
    }
    getModuleInstance() {
        return this.instance;
    }
}
/**
 * @internal
 * @hidden
 */
class ModuleMetadata {
    constructor({ controllers, basePath, middlewares, imports, routers, models }) {
        this._controllers = controllers || null;
        this._models = models || null;
        this._routers = routers || null;
        this._middlewares = middlewares || null;
        this._basePath = basePath || null;
        this._imports = imports || null;
    }
}
exports.ModuleMetadata = ModuleMetadata;
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
function _wrapMethodsInRouter(basePath, instance, decorators, router) {
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
        }
        else {
            router[httpMethod.toLowerCase()](...callerArgs);
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
function _wrapRouterHandlerInMethod(instance, method) {
    return (...args) => instance[method](...args);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlX3Jlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZV9yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQUVILHlDQUFnRTtBQUNoRSxzREFBaUQ7QUFDakQsaUNBQWlDO0FBQ2pDLHNEQUFtRTtBQUNuRSxtQ0FBbUM7QUFDbkMsNkRBQXVEO0FBRXZELGlDQUErQjtBQUcvQjs7R0FFRztBQUNIO0lBT0ksTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFXLEVBQUUsTUFBdUI7UUFDOUMsTUFBTSxDQUFDLElBQUksZUFBZSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMvQyxDQUFDO0NBQ0o7QUFWRCx3Q0FVQztBQUdEOzs7R0FHRztBQUNILHFCQUFzQixTQUFRLGNBQWM7SUFXeEMsWUFBb0IsTUFBVyxFQUFFLE1BQXVCO1FBQ3BELEtBQUssRUFBRSxDQUFDO1FBRFEsV0FBTSxHQUFOLE1BQU0sQ0FBSztRQVQvQixjQUFTLEdBQXFCLEVBQUUsQ0FBQztRQUtqQyxpQkFBWSxHQUFVLEVBQUUsQ0FBQztRQUN6QixXQUFNLEdBQVEsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQy9CLHFCQUFnQixHQUFVLEVBQUUsQ0FBQztRQUl6QixNQUFNLFVBQVUsR0FBRyx1QkFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxNQUFN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