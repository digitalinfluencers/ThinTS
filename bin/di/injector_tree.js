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
    constructor(_controllers, module) {
        super();
        this.module = module;
        this._controllersCache = new Map();
        this._controllers = _controllers;
        for (const controller of _controllers) {
            this._initiate(controller);
        }
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
    push(cls) {
        this._controllers.push(cls);
        this.get(cls);
    }
    pushResolved(cls, instance) {
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
        if (!(controller && typeof controller === "function")) {
            this._throwInvalid(controller);
        }
        const instance = util_1.resolveDeps(controller, this);
        this._controllersCache.set(controller, instance);
        return instance;
    }
    _throwInvalid(cls) {
        throw new Error(`Invalid controller ${cls}.`);
    }
}
exports.InjectorBranch_ = InjectorBranch_;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0b3JfdHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaS9pbmplY3Rvcl90cmVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsa0NBQW9DO0FBR3BDOztHQUVHO0FBQ0g7Q0FJQztBQUpELHdDQUlDO0FBR0Q7OztHQUdHO0FBQ0gscUJBQTZCLFNBQVEsY0FBYztJQUsvQyxZQUFZLFlBQW1CLEVBQVUsTUFBc0I7UUFDM0QsS0FBSyxFQUFFLENBQUM7UUFENkIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFIL0Qsc0JBQWlCLEdBQUcsSUFBSSxHQUFHLEVBQVksQ0FBQztRQUtwQyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUVqQyxHQUFHLENBQUMsQ0FBQyxNQUFNLFVBQVUsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsQ0FBQztJQUNMLENBQUM7SUFFRCxVQUFVLENBQUMsVUFBZTtRQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBRyxVQUFVLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsR0FBRyxDQUFVLFVBQWU7UUFDeEIsRUFBRSxDQUFDLENBQUMsVUFBVSxLQUFLLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsSUFBSSxNQUFNLEdBQW9CLElBQUksQ0FBQztRQUNuQyxPQUFNLE1BQU0sWUFBWSxjQUFjLEVBQUUsQ0FBQztZQUNyQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNDLE1BQU0sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNwRCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN4QyxDQUFDO1lBQ0wsQ0FBQztZQUNELE1BQU0sR0FBb0IsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZELENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxlQUFlO1FBQ1gsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN2QyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxlQUFlLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFDcEQsQ0FBQztJQUVELElBQUksQ0FBQyxHQUFRO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBRUQsWUFBWSxDQUFDLEdBQVEsRUFBRSxRQUFhO1FBQ2hDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxNQUFNLENBQUMsR0FBUTtRQUNYLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUNELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsQ0FBQztJQUNMLENBQUM7SUFFRCxTQUFTLENBQUMsVUFBZTtRQUNyQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxJQUFJLE9BQU8sVUFBVSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFDRCxNQUFNLFFBQVEsR0FBRyxrQkFBVyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNqRCxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxhQUFhLENBQUMsR0FBUTtRQUNsQixNQUFNLElBQUksS0FBSyxDQUNYLHNCQUFzQixHQUFHLEdBQUcsQ0FDL0IsQ0FBQTtJQUNMLENBQUM7Q0FFSjtBQTVFRCwwQ0E0RUMifQ==