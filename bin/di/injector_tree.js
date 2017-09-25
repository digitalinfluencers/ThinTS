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
        this._cache = new Map();
    }
    get(token) {
        if (token === InjectorBranch) {
            return this;
        }
        let branch = this;
        while (branch instanceof InjectorBranch) {
            if (branch.isDeclared(token)) {
                if (branch._cache.has(token)) {
                    return branch._cache.get(token);
                }
                else {
                    return branch.initDependency(token);
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
            this._dependencies.push(cls);
        }
        return this.get(cls);
    }
    pushResolved(cls, instance) {
        if (this.isDeclared(cls)) {
            return;
        }
        this._dependencies.push({ token: cls, class: cls });
        this._cache.set(cls, instance);
    }
    initDependency(cls) {
        if (!cls || !this.isDeclared(cls)) {
            this._throwInvalid(cls);
        }
        const dependency = this._dependencies.find(({ token }) => token === cls);
        if (dependency.class) {
            const instance = util_1.resolveDeps(dependency.class, this);
            this._cache.set(dependency.token, instance);
            return instance;
        }
        if (dependency.value) {
            this._cache.set(dependency.token, dependency.value);
            return dependency.value;
        }
        if (dependency.factory) {
            const deps = dependency.deps || [];
            const resolvedDeps = deps.map((d) => this.get(d));
            const instance = dependency.factory(...resolvedDeps);
            this._cache.set(dependency.token, instance);
            return instance;
        }
        this._throwInvalid(cls);
    }
    isDeclared(cls) {
        return this._dependencies.some(({ token }) => token === cls);
    }
    _throwInvalid(cls) {
        throw new Error(`Invalid ${util_1.stringify(cls)} in ${util_1.stringify(this.module.getModule())}.`);
    }
}
exports.InjectorBranch_ = InjectorBranch_;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0b3JfdHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaS9pbmplY3Rvcl90cmVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsa0NBQStDO0FBSS9DOztHQUVHO0FBQ0g7Q0FJQztBQUpELHdDQUlDO0FBR0Q7OztHQUdHO0FBQ0gscUJBQTZCLFNBQVEsY0FBYztJQUsvQyxZQUFvQixNQUFzQjtRQUN0QyxLQUFLLEVBQUUsQ0FBQztRQURRLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBRjFDLFdBQU0sR0FBRyxJQUFJLEdBQUcsRUFBWSxDQUFDO0lBSTdCLENBQUM7SUFFRCxHQUFHLENBQVUsS0FBVTtRQUNuQixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssY0FBYyxDQUFDLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxJQUFJLE1BQU0sR0FBb0IsSUFBSSxDQUFDO1FBQ25DLE9BQU0sTUFBTSxZQUFZLGNBQWMsRUFBRSxDQUFDO1lBQ3JDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEMsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDeEMsQ0FBQztZQUNMLENBQUM7WUFDRCxNQUFNLEdBQW9CLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2RCxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixD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