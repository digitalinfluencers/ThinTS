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
var reflection_1 = require("../metadata/reflection");
var InjectorBranch = /** @class */ (function () {
    function InjectorBranch() {
    }
    return InjectorBranch;
}());
exports.InjectorBranch = InjectorBranch;
/**
 * @internal
 * @hidden
 */
var InjectorBranch_ = /** @class */ (function (_super) {
    __extends(InjectorBranch_, _super);
    function InjectorBranch_(_controllers, parent) {
        var _this = _super.call(this) || this;
        _this._controllersCache = new Map();
        _this._controllers = _controllers;
        _this._parent = parent || null;
        for (var _i = 0, _controllers_1 = _controllers; _i < _controllers_1.length; _i++) {
            var controller = _controllers_1[_i];
            _this._initiate(controller);
        }
        return _this;
    }
    InjectorBranch_.prototype.isDeclared = function (controller) {
        return this._controllers.some(function (c) { return c === controller; });
    };
    InjectorBranch_.prototype.get = function (controller) {
        if (controller === InjectorBranch) {
            return this;
        }
        var branch = this;
        while (branch instanceof InjectorBranch) {
            if (branch.isDeclared(controller)) {
                if (branch._controllersCache.has(controller)) {
                    return branch._controllersCache.get(controller);
                }
                else {
                    return branch._initiate(controller);
                }
            }
            branch = branch._parent;
        }
        this._throwNull(controller);
    };
    InjectorBranch_.prototype._initiate = function (controller) {
        var _this = this;
        if (!(controller && typeof controller === "function")) {
            this._throwInvalid(controller);
        }
        var deps = reflection_1.Reflection.parameters(controller);
        if (deps.length != controller.length) {
            this._throwInvalid(controller);
        }
        var resolvedDeps = deps.map(function (d) { return _this.get(d); });
        var instance = new (controller.bind.apply(controller, [void 0].concat(resolvedDeps)))();
        this._controllersCache.set(controller, instance);
        return instance;
    };
    InjectorBranch_.prototype._throwInvalid = function (cls) {
        throw new Error("Invalid controller " + cls + ".");
    };
    InjectorBranch_.prototype._throwNull = function (cls) {
        throw new Error("Controller " + cls + " not declared in any module.");
    };
    return InjectorBranch_;
}(InjectorBranch));
exports.InjectorBranch_ = InjectorBranch_;
