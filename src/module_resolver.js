"use strict";
/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("./metadata");
var reflection_1 = require("./metadata/reflection");
var util_1 = require("./util");
var injector_tree_1 = require("./di/injector_tree");
var express = require("express");
var express_controller_1 = require("./express_controller");
var util_2 = require("./util");
var ModuleResolver = /** @class */ (function () {
    function ModuleResolver() {
    }
    ModuleResolver.create = function (module, parent) {
        return new ModuleResolver_(module, parent);
    };
    return ModuleResolver;
}());
exports.ModuleResolver = ModuleResolver;
/**
 * @internal
 * @hidden
 */
var ModuleResolver_ = /** @class */ (function (_super) {
    __extends(ModuleResolver_, _super);
    function ModuleResolver_(module, parent) {
        var _this = _super.call(this) || this;
        _this.module = module;
        _this.childrens = [];
        _this.routersCache = [];
        _this.router = express.Router();
        _this.middlewaresCache = [];
        var decorators = reflection_1.Reflection.decorators(module);
        if (decorators.length !== 1) {
            _this._throwInvalid('ThModule', module);
        }
        if (util_1.stringify(decorators[0]) !== "ThModule") {
            _this._throwInvalid('ThModule', module);
        }
        _this.metadata = new ModuleMetadata(decorators[0].metadata);
        _this._parent = parent || null;
        _this._resolveControllersAndModels();
        _this._resolveImports();
        _this._resolveMiddlewares();
        _this._resolveRouters();
        _this._applyRouter();
        _this._resolveInstance();
        return _this;
    }
    ModuleResolver_.prototype._resolveControllersAndModels = function () {
        var controllers = this.metadata._controllers || [];
        for (var _i = 0, controllers_1 = controllers; _i < controllers_1.length; _i++) {
            var controller = controllers_1[_i];
            if (!metadata_1.checkClassHasDecoratorType('ThController', controller)) {
                this._throwInvalid('ThController', controller);
            }
        }
        var models = this.metadata._models || [];
        for (var _a = 0, models_1 = models; _a < models_1.length; _a++) {
            var model = models_1[_a];
            if (!metadata_1.checkClassHasDecoratorType('ThModel', model)) {
                this._throwInvalid('ThModel', model);
            }
        }
        var parentInject = this._parent ? this._parent.getInjectorTree() : undefined;
        this.injectorTree = new injector_tree_1.InjectorBranch_(controllers.concat(models), parentInject);
    };
    ModuleResolver_.prototype._resolveImports = function () {
        var imports = this.metadata._imports;
        if (!imports) {
            return;
        }
        for (var _i = 0, imports_1 = imports; _i < imports_1.length; _i++) {
            var i = imports_1[_i];
            if (!metadata_1.checkClassHasDecoratorType('ThModule', i)) {
                this._throwInvalid('ThModule', i);
            }
            this.childrens.push(new ModuleResolver_(i, this));
        }
    };
    ModuleResolver_.prototype._resolveMiddlewares = function () {
        var _this = this;
        var middlewares = this.metadata._middlewares;
        if (!middlewares) {
            return;
        }
        middlewares.forEach(function (md) {
            if (!util_2.isClass(md)) {
                _this.router.use(md);
                return;
            }
            if (!metadata_1.checkClassHasDecoratorType('ThMiddleware', md)) {
                _this._throwInvalid('ThMiddleware', md);
            }
            var deps = reflection_1.Reflection.parameters(md);
            var resolvedDeps = deps.map(function (d) { return _this.injectorTree.get(d); });
            var instance = new (md.bind.apply(md, [void 0].concat(resolvedDeps)))();
            if (typeof instance.handler !== "function") {
                _this._throwInvalid('ThMiddlewareImplements', md);
            }
            _this.middlewaresCache.push(instance);
            _this.router.use(function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return instance.handler.apply(instance, args);
            });
        });
    };
    ModuleResolver_.prototype._resolveRouters = function () {
        var _this = this;
        var routers = this.metadata._routers || [];
        var resolvedRouters = routers.map(function (router) {
            if (!metadata_1.checkClassHasDecoratorType('ThRouter', router)) {
                _this._throwInvalid("ThRouter", router);
            }
            var deps = reflection_1.Reflection.parameters(router);
            var resolvedDeps = deps.map(function (d) { return _this.injectorTree.get(d); });
            var instance = new (router.bind.apply(router, [void 0].concat(resolvedDeps)))();
            var basePath = reflection_1.Reflection.decorators(router)[0].metadata || ('/' + router.name);
            var prototype = Object.getPrototypeOf(instance);
            var decorators = reflection_1.Reflection.decorators(prototype);
            _this.routersCache.push(instance);
            _wrapMethodsInRouter(basePath, instance, decorators, _this.router);
        });
        this.routersCache = resolvedRouters;
    };
    ModuleResolver_.prototype._resolveInstance = function () {
        var _this = this;
        var deps = reflection_1.Reflection.parameters(this.module);
        var resolvedDeps = deps.map(function (d) { return _this.injectorTree.get(d); });
        this.instance = new ((_a = this.module).bind.apply(_a, [void 0].concat(resolvedDeps)))();
        this.injectorTree._controllers.push(this.module);
        this.injectorTree._controllersCache.set(this.module, this.instance);
        var _a;
    };
    ModuleResolver_.prototype._applyRouter = function () {
        var basePath = this.metadata._basePath || '/';
        if (this._parent) {
            this._parent.getRouter().use(basePath, this.router);
            return;
        }
        var expressController = this.injectorTree.get(express_controller_1.ExpressController);
        var expressApp = expressController.getApp();
        expressApp.use(basePath, this.router);
    };
    ModuleResolver_.prototype._throwInvalid = function (expected, cls) {
        throw new Error("Invalid " + expected + " " + util_1.stringify(cls) + ".");
    };
    ModuleResolver_.prototype.getParent = function () {
        return this._parent;
    };
    ModuleResolver_.prototype.getInjectorTree = function () {
        return this.injectorTree;
    };
    ModuleResolver_.prototype.getRouter = function () {
        return this.router;
    };
    return ModuleResolver_;
}(ModuleResolver));
/**
 * @internal
 * @hidden
 */
var ModuleMetadata = /** @class */ (function () {
    function ModuleMetadata(_a) {
        var controllers = _a.controllers, basePath = _a.basePath, middlewares = _a.middlewares, imports = _a.imports, routers = _a.routers, models = _a.models;
        this._controllers = controllers || null;
        this._models = models || null;
        this._routers = routers || null;
        this._middlewares = middlewares || null;
        this._basePath = basePath || null;
        this._imports = imports || null;
    }
    return ModuleMetadata;
}());
exports.ModuleMetadata = ModuleMetadata;
/**
 * @internal
 * @hidden
 * @type {[string , string , string , string , string , string]}
 */
var httpMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'PARAM'];
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
    for (var _i = 0, decorators_1 = decorators; _i < decorators_1.length; _i++) {
        var decorator = decorators_1[_i];
        var httpMethod = decorator.name;
        var methodName = decorator.metadata.method;
        var args = decorator.metadata.args;
        var path = args[0] || methodName;
        var callerArgs = ["" + basePath + path, _wrapRouterHandlerInMethod(instance, methodName)];
        if (httpMethods.indexOf(httpMethod) == -1) {
            throw new Error("Invalid http method at " + instance.constructor.name + "." + methodName);
        }
        (_a = router)[httpMethod.toLowerCase()].apply(_a, callerArgs);
    }
    var _a;
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
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return instance[method].apply(instance, args);
    };
}
