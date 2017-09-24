"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
const util_1 = require("../util");
/**
 * Responsible to manage all dependencies in modules.
 */
class InjectorBranch {
}
exports.InjectorBranch = InjectorBranch;
/**
 * @internal
 * @hidden
 */
class InjectorBranch_ extends InjectorBranch {
    constructor(module) {
        super();
        this.module = module;
        this._controllersCache = new Map();
        this._controllers = [];
    }
    isDeclared(controller) {
        return this._controllers.some(c => c === controller);
    }
    get(controller) {
        if (controller === InjectorBranch) {
            return this;
        }
        let branch = this;
        while (branch instanceof InjectorBranch) {
            if (branch.isDeclared(controller)) {
                if (branch._controllersCache.has(controller)) {
                    return branch._controllersCache.get(controller);
                }
                else {
                    return branch._initiate(controller);
                }
            }
            branch = branch.getParentBranch();
        }
        return null;
    }
    getParentBranch() {
        const parent = this.module.getParent();
        return parent ? parent.getInjectorTree() : null;
    }
    pushAndResolve(cls) {
        if (!this.isDeclared(cls)) {
            this._controllers.push(cls);
        }
        return this.get(cls);
    }
    pushResolved(cls, instance) {
        if (this.isDeclared(cls)) {
            return;
        }
        this._controllers.push(cls);
        this._controllersCache.set(cls, instance);
    }
    remove(cls) {
        if (this._controllersCache.has(cls)) {
            this._controllersCache.delete(cls);
        }
        const index = this._controllers.indexOf(cls);
        if (index !== -1) {
            this._controllers.splice(index, 1);
        }
    }
    _initiate(controller) {
        if (!controller) {
            this._throwInvalid(controller);
        }
        if (controller.token) {
            this._controllersCache.set(controller.token, controller.value);
            this._controllers.push(controller.token);
            return controller.value;
        }
        if (typeof controller !== "function") {
            this._throwInvalid(controller);
        }
        const instance = util_1.resolveDeps(controller, this);
        this._controllersCache.set(controller, instance);
        this._controllers.push(controller);
        return instance;
    }
    _throwInvalid(cls) {
        throw new Error(`Invalid controller ${util_1.stringify(cls)}.`);
    }
}
exports.InjectorBranch_ = InjectorBranch_;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0b3JfdHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaS9pbmplY3Rvcl90cmVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsa0NBQStDO0FBSS9DOztHQUVHO0FBQ0g7Q0FJQztBQUpELHdDQUlDO0FBR0Q7OztHQUdHO0FBQ0gscUJBQTZCLFNBQVEsY0FBYztJQUsvQyxZQUFvQixNQUFzQjtRQUN0QyxLQUFLLEVBQUUsQ0FBQztRQURRLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBSDFDLHNCQUFpQixHQUFHLElBQUksR0FBRyxFQUFZLENBQUM7UUFDeEMsaUJBQVksR0FBVSxFQUFFLENBQUM7SUFJekIsQ0FBQztJQUVELFVBQVUsQ0FBQyxVQUFlO1FBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFHLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxHQUFHLENBQVUsVUFBZTtRQUN4QixFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssY0FBYyxDQUFDLENBQUMsQ0FBQztZQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxJQUFJLE1BQU0sR0FBb0IsSUFBSSxDQUFDO1FBQ25DLE9BQU0sTUFBTSxZQUFZLGNBQWMsRUFBRSxDQUFDO1lBQ3JDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDM0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3BELENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osTUFBTSxD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