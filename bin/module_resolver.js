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
const express_controller_1 = require("./controllers/express_controller");
const util_2 = require("./util");
const main_application_1 = require("./main_application");
const injector_token_1 = require("./di/injector_token");
const util_3 = require("util");
/**
 * Responsible to compile and manage all modules.
 */
class ModuleResolver {
    static create(module, parent, extraControllers) {
        return new ModuleResolver_(module, parent, extraControllers);
    }
}
exports.ModuleResolver = ModuleResolver;
/**
 * @internal
 * @hidden
 */
class ModuleResolver_ extends ModuleResolver {
    constructor(module, parent, extraControllers) {
        super();
        this.module = module;
        this.childrens = [];
        this.routersCache = [];
        this.router = express.Router();
        this.middlewaresCache = [];
        const decorators = reflection_1.Reflection.decorators(this.module);
        if (decorators.length !== 1) {
            this._throwInvalid('ThModule', this.module);
        }
        if (util_1.stringify(decorators[0]) !== "ThModule") {
            this._throwInvalid('ThModule', this.module);
        }
        this.metadata = new ModuleMetadata(decorators[0].metadata);
        this.injectorTree = new injector_tree_1.InjectorBranch_(this);
        this._parent = parent || null;
        if (Array.isArray(extraControllers)) {
            this.metadata._controllers.push(...extraControllers);
        }
        if (!this._isMainApplication()) {
            main_application_1.MainApplication.getChildResolvers().set(this.module, this);
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
        for (const controller of controllers) {
            const isInjectorToken = controller.token instanceof injector_token_1.InjectorToken && !util_3.isUndefined(controller.value);
            const isThController = metadata_1.checkClassHasDecoratorType('ThController', controller);
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
        for (const model of models) {
            const isInjectorToken = model.token instanceof injector_token_1.InjectorToken && !util_3.isUndefined(model.value);
            const isThModel = metadata_1.checkClassHasDecoratorType('ThModel', model);
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
        for (const module of imports) {
            if (typeof module === "function") {
                if (!metadata_1.checkClassHasDecoratorType('ThModule', module)) {
                    this._throwInvalid('ThModule', module);
                }
                let resolvedModule;
                if (main_application_1.MainApplication.getChildResolvers().has(module)) {
                    resolvedModule = main_application_1.MainApplication.getChildResolvers().get(module);
                }
                else {
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
        middlewares.forEach((md) => {
            if (!util_2.isClass(md)) {
                this.router.use(md);
                return;
            }
            if (!metadata_1.checkClassHasDecoratorType('ThMiddleware', md)) {
                this._throwInvalid('ThMiddleware', md);
            }
            const instance = util_1.resolveDeps(md, this.injectorTree);
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
            const instance = util_1.resolveDeps(router, this.injectorTree);
            const basePath = reflection_1.Reflection.decorators(router)[0].metadata || ('/' + router.name);
            const prototype = Object.getPrototypeOf(instance);
            const decorators = reflection_1.Reflection.decorators(prototype);
            this.routersCache.push(instance);
            _wrapMethodsInRouter(basePath, instance, decorators, this.router);
        });
        this.routersCache = resolvedRouters;
    }
    _resolveInstance() {
        this.instance = util_1.resolveDeps(this.module, this.injectorTree);
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
                throw new Error(`To ${util_1.stringify(exp)} can be exported, he need to be declared.`);
            }
        }
    }
    _isMainApplication() {
        return this.module === main_application_1.MainApplication;
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
        const expressController = this.injectorTree.get(express_controller_1.ExpressController);
        if (expressController) {
            const expressApp = expressController.getApp();
            expressApp.use(basePath, this.router);
        }
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
    constructor({ controllers, basePath, middlewares, imports, routers, models, exports }) {
        this._controllers = controllers || [];
        this._models = models || [];
        this._routers = routers || null;
        this._middlewares = middlewares || null;
        this._basePath = basePath || null;
        this._imports = imports || null;
        this._exports = exports || [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlX3Jlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZV9yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQUVILHlDQUFnRTtBQUNoRSxzREFBaUQ7QUFDakQsaUNBQThDO0FBQzlDLHNEQUFtRTtBQUNuRSxtQ0FBbUM7QUFDbkMseUVBQW1FO0FBRW5FLGlDQUErQjtBQUUvQix5REFBdUU7QUFDdkUsd0RBQWtEO0FBQ2xELCtCQUFpQztBQUVqQzs7R0FFRztBQUNIO0lBT0ksTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFXLEVBQUUsTUFBdUIsRUFBRSxnQkFBd0I7UUFDeEUsTUFBTSxDQUFDLElBQUksZUFBZSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUNqRSxDQUFDO0NBQ0o7QUFWRCx3Q0FVQztBQUdEOzs7R0FHRztBQUNILHFCQUFzQixTQUFRLGNBQWM7SUFXeEMsWUFBb0IsTUFBVyxFQUFFLE1BQXVCLEVBQUUsZ0JBQXdCO1FBQzlFLEtBQUssRUFBRSxDQUFDO1FBRFEsV0FBTSxHQUFOLE1BQU0sQ0FBSztRQVQvQixjQUFTLEdBQXFCLEVBQUUsQ0FBQztRQUtqQyxpQkFBWSxHQUFVLEVBQUUsQ0FBQztRQUN6QixXQUFNLEdBQVEsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQy9CLHFCQUFnQixHQUFVLEVBQUUsQ0FBQztRQUl6QixNQUFNLFVBQVUsR0FBRyx1QkFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEQsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsZ0JBQVMs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