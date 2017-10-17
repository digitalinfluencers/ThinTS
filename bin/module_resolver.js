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
    constructor(module, parent, extraControllers = []) {
        super();
        this.module = module;
        this.childrens = [];
        this.routersCache = [];
        this.router = express.Router();
        this.middlewaresCache = [];
        const decorators = reflection_1.Reflection.decorators(this.module);
        if (decorators.length !== 1 || util_1.stringify(decorators[0]) !== "ThModule") {
            _throwInvalid('ThModule', this.module);
        }
        this.parent = parent || null;
        this.metadata = new ModuleMetadata(decorators[0].metadata);
        this.metadata._controllers.push(...extraControllers);
        this.injectorTree = new injector_tree_1.InjectorBranch_(this);
        if (!this._isMainApplication()) {
            main_application_1.MainApplication.getChildResolvers().set(this.module, this);
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
        const normalizedModels = _normalizeDependencies(models, "ThModel");
        this.injectorTree._dependencies = [...normalizedControllers, ...normalizedModels];
    }
    resolveImports() {
        const imports = this.metadata._imports;
        if (!imports) {
            return;
        }
        for (const module of imports) {
            if (!metadata_1.checkClassHasDecoratorType('ThModule', module)) {
                _throwInvalid('ThModule', module);
            }
            let resolvedModule;
            if (main_application_1.MainApplication.getChildResolvers().has(module)) {
                resolvedModule = main_application_1.MainApplication.getChildResolvers().get(module);
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
        middlewares.forEach((md) => {
            if (!util_2.isClass(md)) {
                this.router.use(md);
                return;
            }
            if (!metadata_1.checkClassHasDecoratorType('ThMiddleware', md)) {
                _throwInvalid('ThMiddleware', md);
            }
            const instance = util_1.resolveDeps(md, this.injectorTree);
            if (typeof instance.handler !== "function") {
                _throwInvalid('ThMiddlewareImplements', md);
            }
            this.middlewaresCache.push(instance);
            this.router.use((...args) => instance.handler(...args));
        });
    }
    resolveRouters() {
        const routers = this.metadata._routers || [];
        const resolvedRouters = routers.map((router) => {
            if (!metadata_1.checkClassHasDecoratorType('ThRouter', router)) {
                _throwInvalid("ThRouter", router);
            }
            const instance = util_1.resolveDeps(router, this.injectorTree);
            const basePath = reflection_1.Reflection.decorators(router)[0].metadata || '';
            const prototype = Object.getPrototypeOf(instance);
            const decorators = reflection_1.Reflection.decorators(prototype);
            this.routersCache.push(instance);
            _wrapMethodsInRouter(basePath, instance, decorators, this.router);
        });
        this.routersCache = resolvedRouters;
    }
    resolveInstance() {
        this.instance = util_1.resolveDeps(this.module, this.injectorTree);
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
                throw new Error(`To ${util_1.stringify(exp)} can be exported, he need to be declared.`);
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
        const expressController = this.injectorTree.get(express_controller_1.ExpressController);
        if (expressController) {
            const expressApp = expressController.getApp();
            expressApp.use(basePath, this.router);
        }
    }
    _isMainApplication() {
        return this.module === main_application_1.MainApplication;
    }
    getParent() {
        return this.parent;
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
    getModule() {
        return this.module;
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
        const path = args[0] || '';
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
/**
 * @internal
 * @hidden
 * @private
 */
function _normalizeDependencies(clss, type) {
    return clss.map((cls) => {
        if (typeof cls === "function") {
            if (!metadata_1.checkClassHasDecoratorType(type, cls)) {
                _throwInvalid(type, cls);
            }
            return { token: cls, class: cls };
        }
        if (cls.token) {
            const isInjectorToken = cls.token instanceof injector_token_1.InjectorToken;
            const isFunction = typeof cls.token === "function";
            if (!isFunction && !isInjectorToken) {
                _throwInvalid(`${type} Token,`, "must be InjectorToken");
            }
            if (cls.factory && typeof cls.factory !== "function") {
                _throwInvalid(`${type} factory,`, "must be a function");
            }
            if (cls.class && !util_2.isClass(cls.class)) {
                _throwInvalid(`${type} class,`, "must be a class");
            }
            return cls;
        }
        _throwInvalid(type, cls);
    });
}
/**
 * @internal
 * @hidden
 * @private
 */
function _throwInvalid(expected, cls) {
    throw new Error(`Invalid ${expected} ${util_1.stringify(cls)}.`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlX3Jlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZV9yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQUVILHlDQUFnRTtBQUNoRSxzREFBaUQ7QUFDakQsaUNBQThDO0FBQzlDLHNEQUFtRTtBQUNuRSxtQ0FBbUM7QUFDbkMseUVBQW1FO0FBRW5FLGlDQUErQjtBQUUvQix5REFBbUQ7QUFDbkQsd0RBQWtEO0FBR2xEOztHQUVHO0FBQ0g7SUFRSSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQVcsRUFBRSxNQUF1QixFQUFFLGdCQUF3QjtRQUN4RSxNQUFNLENBQUMsSUFBSSxlQUFlLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Q0FDSjtBQVhELHdDQVdDO0FBR0Q7OztHQUdHO0FBQ0gscUJBQXNCLFNBQVEsY0FBYztJQVd4QyxZQUFvQixNQUFXLEVBQUUsTUFBdUIsRUFBRSxtQkFBMEIsRUFBRTtRQUNsRixLQUFLLEVBQUUsQ0FBQztRQURRLFdBQU0sR0FBTixNQUFNLENBQUs7UUFUL0IsY0FBUyxHQUFxQixFQUFFLENBQUM7UUFLakMsaUJBQVksR0FBVSxFQUFFLENBQUM7UUFDekIsV0FBTSxHQUFRLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMvQixxQkFBZ0IsR0FBVSxFQUFFLENBQUM7UUFJekIsTUFBTSxVQUFVLEdBQUcsdUJBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLGdCQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNyRSxhQUFhLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMz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