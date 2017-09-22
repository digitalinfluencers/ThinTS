"use strict";
/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
Object.defineProperty(exports, "__esModule", { value: true });
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
    constructor(_controllers, parent) {
        super();
        this._controllersCache = new Map();
        this._controllers = _controllers;
        this._parent = parent || null;
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
            branch = branch._parent;
        }
        return null;
    }
    push(cls) {
        this._controllers.push(cls);
        this.get(cls);
    }
    pushResolved(cls, instance) {
        this._controllers.push(cls);
        this._controllersCache.set(cls, instance);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0b3JfdHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaS9pbmplY3Rvcl90cmVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7O0FBR0gsa0NBQW9DO0FBRXBDOztHQUVHO0FBQ0g7Q0FJQztBQUpELHdDQUlDO0FBR0Q7OztHQUdHO0FBQ0gscUJBQTZCLFNBQVEsY0FBYztJQU0vQyxZQUFZLFlBQW1CLEVBQUUsTUFBdUI7UUFDcEQsS0FBSyxFQUFFLENBQUM7UUFMWixzQkFBaUIsR0FBRyxJQUFJLEdBQUcsRUFBWSxDQUFDO1FBTXBDLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxJQUFJLElBQUksQ0FBQztRQUU5QixHQUFHLENBQUMsQ0FBQyxNQUFNLFVBQVUsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsQ0FBQztJQUNMLENBQUM7SUFFRCxVQUFVLENBQUMsVUFBZTtRQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBRyxVQUFVLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsR0FBRyxDQUFVLFVBQWU7UUFDeEIsRUFBRSxDQUFDLENBQUMsVUFBVSxLQUFLLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsSUFBSSxNQUFNLEdBQW9CLElBQUksQ0FBQztRQUNuQyxPQUFNLE1BQU0sWUFBWSxjQUFjLEVBQUUsQ0FBQztZQUNyQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNDLE1BQU0sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNwRCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN4QyxDQUFDO1lBQ0wsQ0FBQztZQUNELE1BQU0sR0FBb0IsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUM3QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsSUFBSSxDQUFDLEdBQVE7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFRCxZQUFZLENBQUMsR0FBUSxFQUFFLFFBQWE7UUFDaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELFNBQVMsQ0FBQyxVQUFlO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksT0FBTyxVQUFVLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUNELE1BQU0sUUFBUSxHQUFHLGtCQUFXLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUVELGFBQWEsQ0FBQyxHQUFRO1FBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQ1gsc0JBQXNCLEdBQUcsR0FBRyxDQUMvQixDQUFBO0lBQ0wsQ0FBQztDQUVKO0FBL0RELDBDQStEQyJ9