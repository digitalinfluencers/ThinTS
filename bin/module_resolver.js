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
        this.resolveMiddlewares();
        this.resolveImports();
        this.resolveExports();
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
        this.routersCache = routers.map((router) => {
            if (!metadata_1.checkClassHasDecoratorType('ThRouter', router)) {
                _throwInvalid("ThRouter", router);
            }
            const instance = util_1.resolveDeps(router, this.injectorTree);
            const basePath = reflection_1.Reflection.decorators(router)[0].metadata || '';
            const prototype = Object.getPrototypeOf(instance);
            const decorators = reflection_1.Reflection.decorators(prototype);
            _wrapMethodsInRouter(basePath, instance, decorators, this.router);
            return instance;
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlX3Jlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZV9yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQUVILHlDQUFnRTtBQUNoRSxzREFBaUQ7QUFDakQsaUNBQThDO0FBQzlDLHNEQUFtRTtBQUNuRSxtQ0FBbUM7QUFDbkMseUVBQW1FO0FBRW5FLGlDQUErQjtBQUUvQix5REFBbUQ7QUFDbkQsd0RBQWtEO0FBSWxEOztHQUVHO0FBQ0g7SUFRSSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQVcsRUFBRSxNQUF1QixFQUFFLGdCQUF3QjtRQUN4RSxNQUFNLENBQUMsSUFBSSxlQUFlLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Q0FDSjtBQVhELHdDQVdDO0FBR0Q7OztHQUdHO0FBQ0gscUJBQXNCLFNBQVEsY0FBYztJQVd4QyxZQUFvQixNQUFXLEVBQUUsTUFBdUIsRUFBRSxtQkFBMEIsRUFBRTtRQUNsRixLQUFLLEVBQUUsQ0FBQztRQURRLFdBQU0sR0FBTixNQUFNLENBQUs7UUFUL0IsY0FBUyxHQUFxQixFQUFFLENBQUM7UUFLakMsaUJBQVksR0FBVSxFQUFFLENBQUM7UUFDekIsV0FBTSxHQUFRLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMvQixxQkFBZ0IsR0FBVSxFQUFFLENBQUM7UUFJekIsTUFBTSxVQUFVLEdBQUcsdUJBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLGdCQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNyRSxhQUFhLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMz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