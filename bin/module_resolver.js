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
        const decorators = reflection_1.Reflection.decorators(this.module);
        if (decorators.length !== 1) {
            this._throwInvalid('ThModule', this.module);
        }
        if (util_1.stringify(decorators[0]) !== "ThModule") {
            this._throwInvalid('ThModule', this.module);
        }
        this.metadata = new ModuleMetadata(decorators[0].metadata);
        this._parent = parent || null;
        this._resolveControllersAndModels();
        this._resolveExports();
        this._resolveMiddlewares();
        this._resolveImports();
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
        this.injectorTree = new injector_tree_1.InjectorBranch_([...controllers, ...models], this);
    }
    _resolveImports() {
        const imports = this.metadata._imports;
        if (!imports) {
            return;
        }
        for (let module of imports) {
            this.childrens.push(new ModuleResolver_(module, this));
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
            const instance = this.injectorTree.get(exp);
            const injectorTree = this.injectorTree;
            const parentBranch = injectorTree.getParentBranch();
            if (parentBranch) {
                parentBranch.pushResolved(exp, instance);
                /**
                 * Remove duplicated reference, now reference can be find only in parent injector branch.
                 */
                injectorTree.remove(exp);
            }
        }
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
    constructor({ controllers, basePath, middlewares, imports, routers, models, exports }) {
        this._controllers = controllers || null;
        this._models = models || null;
        this._routers = routers || null;
        this._middlewares = middlewares || null;
        this._basePath = basePath || null;
        this._imports = imports || null;
        this._exports = exports || null;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlX3Jlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZV9yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQUVILHlDQUFnRTtBQUNoRSxzREFBaUQ7QUFDakQsaUNBQThDO0FBQzlDLHNEQUFtRTtBQUNuRSxtQ0FBbUM7QUFDbkMsNkRBQXVEO0FBRXZELGlDQUErQjtBQUcvQjs7R0FFRztBQUNIO0lBT0ksTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFXLEVBQUUsTUFBdUI7UUFDOUMsTUFBTSxDQUFDLElBQUksZUFBZSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMvQyxDQUFDO0NBQ0o7QUFWRCx3Q0FVQztBQUdEOzs7R0FHRztBQUNILHFCQUFzQixTQUFRLGNBQWM7SUFXeEMsWUFBb0IsTUFBVyxFQUFFLE1BQXVCO1FBQ3BELEtBQUssRUFBRSxDQUFDO1FBRFEsV0FBTSxHQUFOLE1BQU0sQ0FBSztRQVQvQixjQUFTLEdBQXFCLEVBQUUsQ0FBQztRQUtqQyxpQkFBWSxHQUFVLEVBQUUsQ0FBQztRQUN6QixXQUFNLEdBQVEsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQy9CLHFCQUFnQixHQUFVLEVBQUUsQ0FBQztRQUl6QixNQUFNLFVBQVUsR0FBRyx1QkFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEQsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxhQUFh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