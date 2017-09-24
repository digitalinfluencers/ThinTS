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
const util_1 = require("util");
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
    if (util_1.isObject(d)) {
        return JSON.stringify(d);
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
    throw new Error(`Failed to resolve all parameters for ${stringify(target)}, are ${stringify(dep)} declared in ThModule?`);
}
/**
 * Use to get deep path in object
 * @example
 * <pre><code>
 *     const obj = { path1: { path2: { value: 'last_path' } } };
 *     objectPath(obj, 'path1.path2.value'); // last_path
 *     objectPath(obj, 'path1.path2.notexist'); // undefined
 *     objectPath(obj, 'path1.path2.notexist', true); // true
 * </pre></code>
 * @param obj
 * @param {string} fullPath
 * @param notFoundValue
 * @returns {T}
 */
function objectPath(obj, fullPath, notFoundValue) {
    if (!util_1.isObject(obj)) {
        return notFoundValue;
    }
    const paths = fullPath.split('.');
    let value = obj[paths[0]];
    let index = 1;
    while (util_1.isObject(value) && index < paths.length) {
        value = value[paths[index++]];
    }
    if (index === paths.length) {
        return value;
    }
    return notFoundValue;
}
exports.objectPath = objectPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7O0FBSUgsc0RBQWlEO0FBQ2pELCtCQUEyQztBQUUzQzs7Ozs7R0FLRztBQUNILG1CQUEwQixDQUFNO0lBQzVCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2IsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDVCxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNsQixDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUMsZUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNiLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUNELE1BQU0sQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDO0FBQ2hCLENBQUM7QUFqQkQsOEJBaUJDO0FBR0Q7Ozs7O0dBS0c7QUFDSCxpQkFBd0IsSUFBUztJQUM3QixFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNELE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ25FLENBQUM7QUFMRCwwQkFLQztBQUdELHFCQUE0QixHQUFRLEVBQUUsWUFBNEI7SUFDOUQsTUFBTSxJQUFJLEdBQUcsdUJBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUM3QixNQUFNLElBQUksS0FBSyxDQUNYLDBFQUEwRSxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUMzRyxDQUFBO0lBQ0wsQ0FBQztJQUNELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFNLEtBQUssWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckYsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUM7QUFDcEMsQ0FBQztBQVRELGtDQVNDO0FBRUQsb0JBQW9CLE1BQVcsRUFBRSxHQUFRO0lBQ3JDLE1BQU0sSUFBSSxLQUFLLENBQ1gsd0NBQXdDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxTQUFTLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUMzRyxDQUFBO0FBQ0wsQ0FBQztBQUdEOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSCxvQkFBb0MsR0FBUSxFQUFFLFFBQWdCLEVBQUUsYUFBaUI7SUFDN0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxlQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sQ0FBQyxhQUFhLENBQUM7SUFDekIsQ0FBQztJQUNELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEMsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNkLE9BQU0sZUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDNUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDekIsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBQ0QsTUFBTSxDQUFDLGFBQWEsQ0FBQztBQUN6QixDQUFDO0FBZEQsZ0NBY0MifQ==