"use strict";
/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const reflection_1 = require("./metadata/reflection");
/**
 * @internal
 * @hidden
 * @param d
 * @returns {string}
 */
function stringify(d) {
    if (d === null) {
        return 'null';
    }
    if (d === undefined) {
        return 'undefined';
    }
    if (d.name) {
        return d.name;
    }
    if (d.toString) {
        return d.toString();
    }
    return '' + d;
}
exports.stringify = stringify;
/**
 * @internal
 * @hidden
 * @param func
 * @returns {boolean}
 */
function isClass(func) {
    if (typeof func !== 'function') {
        return false;
    }
    return /^class\s/.test(Function.prototype.toString.call(func));
}
exports.isClass = isClass;
function resolveDeps(cls, injectorTree) {
    const deps = reflection_1.Reflection.parameters(cls);
    if (deps.length !== cls.length) {
        throw new Error(`Only ThComponents like ThController, ThModule, etc... can be resolved. ${stringify(cls)} is not valid.`);
    }
    const resolvedDeps = deps.map((d) => injectorTree.get(d) || _throwNull(cls, d));
    return new cls(...resolvedDeps);
}
exports.resolveDeps = resolveDeps;
function _throwNull(target, dep) {
    throw new Error(`Failed to resolve all parameters for ${stringify(target)}, are ${stringify(dep)} declared in any ThModule?`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7O0FBSUgsc0RBQWlEO0FBRWpEOzs7OztHQUtHO0FBQ0gsbUJBQTBCLENBQU07SUFDNUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDYixNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNsQixNQUFNLENBQUMsV0FBVyxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNULE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2xCLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNiLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUNELE1BQU0sQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDO0FBQ2hCLENBQUM7QUFkRCw4QkFjQztBQUdEOzs7OztHQUtHO0FBQ0gsaUJBQXdCLElBQVM7SUFDN0IsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztRQUM3QixNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNuRSxDQUFDO0FBTEQsMEJBS0M7QUFHRCxxQkFBNEIsR0FBUSxFQUFFLFlBQTRCO0lBQzlELE1BQU0sSUFBSSxHQUFHLHVCQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FDWCwwRUFBMEUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FDM0csQ0FBQTtJQUNMLENBQUM7SUFDRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBTSxLQUFLLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFURCxrQ0FTQztBQUVELG9CQUFvQixNQUFXLEVBQUUsR0FBUTtJQUNyQyxNQUFNLElBQUksS0FBSyxDQUNYLHdDQUF3QyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsU0FBUyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FDL0csQ0FBQTtBQUNMLENBQUMifQ==