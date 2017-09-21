"use strict";
/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const reflection_1 = require("../metadata/reflection");
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
        this._throwNull(controller);
    }
    _initiate(controller) {
        if (!(controller && typeof controller === "function")) {
            this._throwInvalid(controller);
        }
        const deps = reflection_1.Reflection.parameters(controller);
        if (deps.length != controller.length) {
            this._throwInvalid(controller);
        }
        const resolvedDeps = deps.map((d) => this.get(d));
        const instance = new controller(...resolvedDeps);
        this._controllersCache.set(controller, instance);
        return instance;
    }
    _throwInvalid(cls) {
        throw new Error(`Invalid controller ${cls}.`);
    }
    _throwNull(cls) {
        throw new Error(`Controller ${cls} not declared in any module.`);
    }
}
exports.InjectorBranch_ = InjectorBranch_;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0b3JfdHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaS9pbmplY3Rvcl90cmVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7O0FBRUgsdURBQWtEO0FBRWxEO0NBSUM7QUFKRCx3Q0FJQztBQUdEOzs7R0FHRztBQUNILHFCQUE2QixTQUFRLGNBQWM7SUFNL0MsWUFBWSxZQUFtQixFQUFFLE1BQXVCO1FBQ3BELEtBQUssRUFBRSxDQUFDO1FBTFosc0JBQWlCLEdBQUcsSUFBSSxHQUFHLEVBQVksQ0FBQztRQU1wQyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sSUFBSSxJQUFJLENBQUM7UUFFOUIsR0FBRyxDQUFDLENBQUMsTUFBTSxVQUFVLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9CLENBQUM7SUFDTCxDQUFDO0lBRUQsVUFBVSxDQUFDLFVBQWU7UUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUcsVUFBVSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELEdBQUcsQ0FBVSxVQUFlO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELElBQUksTUFBTSxHQUFvQixJQUFJLENBQUM7UUFDbkMsT0FBTSxNQUFNLFlBQVksY0FBYyxFQUFFLENBQUM7WUFDckMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDcEQsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDeEMsQ0FBQztZQUNMLENBQUM7WUFDRCxNQUFNLEdBQW9CLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDN0MsQ0FBQztRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELFNBQVMsQ0FBQyxVQUFlO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksT0FBTyxVQUFVLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUNELE1BQU0sSUFBSSxHQUFHLHVCQUFVLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBRUQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQU0sS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkQsTUFBTSxRQUFRLEdBQUcsSUFBSSxVQUFVLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNqRCxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxhQUFhLENBQUMsR0FBUTtRQUNsQixNQUFNLElBQUksS0FBSyxDQUNYLHNCQUFzQixHQUFHLEdBQUcsQ0FDL0IsQ0FBQTtJQUNMLENBQUM7SUFFRCxVQUFVLENBQUMsR0FBUTtRQUNmLE1BQU0sSUFBSSxLQUFLLENBQ1gsY0FBYyxHQUFHLDhCQUE4QixDQUNsRCxDQUFBO0lBQ0wsQ0FBQztDQUVKO0FBakVELDBDQWlFQyJ9