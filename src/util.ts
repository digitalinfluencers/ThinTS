/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */


import {InjectorBranch} from "./di/injector_tree";
import {Reflection} from "./metadata/reflection";
import {isObject, isUndefined} from "util";

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
    if (isObject(d)) {
        return JSON.stringify(d);
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
        `Failed to resolve all parameters for ${stringify(target)}, are ${stringify(dep)} declared in ThModule?`
    )
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
export function objectPath<T = any>(obj: any, fullPath: string, notFoundValue?: T): T|undefined {
    if (!isObject(obj)) {
        return notFoundValue;
    }
    const paths = fullPath.split('.');
    let value = obj[paths[0]];
    let index = 1;
    while(isObject(value) && index < paths.length) {
        value = value[paths[index++]];
    }
    if (index === paths.length) {
        return value;
    }
    return notFoundValue;
}