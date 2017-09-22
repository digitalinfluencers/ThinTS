/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */


import {InjectorBranch} from "./di/injector_tree";
import {Reflection} from "./metadata/reflection";

/**
 * @internal
 * @hidden
 * @param d
 * @returns {string}
 */
export function stringify(d: any): string {
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
    return ''+d;
}


/**
 * @internal
 * @hidden
 * @param func
 * @returns {boolean}
 */
export function isClass(func: any): boolean {
    if (typeof func !== 'function') {
        return false;
    }
    return /^class\s/.test(Function.prototype.toString.call(func));
}


export function resolveDeps(cls: any, injectorTree: InjectorBranch) {
    const deps = Reflection.parameters(cls);
    if (deps.length !== cls.length) {
        throw new Error(
            `Only ThComponents like ThController, ThModule, etc... can be resolved. ${stringify(cls)} is not valid.`
        )
    }
    const resolvedDeps = deps.map((d: any) => injectorTree.get(d) || _throwNull(cls, d));
    return new cls(...resolvedDeps);
}

function _throwNull(target: any, dep: any) {
    throw new Error(
        `Failed to resolve all parameters for ${stringify(target)}, are ${stringify(dep)} declared in any ThModule?`
    )
}