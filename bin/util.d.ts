/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
import { InjectorBranch } from "./di/injector_tree";
/**
 * @internal
 * @hidden
 * @param d
 * @returns {string}
 */
export declare function stringify(d: any): string;
/**
 * @internal
 * @hidden
 * @param func
 * @returns {boolean}
 */
export declare function isClass(func: any): boolean;
export declare function resolveDeps(cls: any, injectorTree: InjectorBranch): any;
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
export declare function objectPath<T = any>(obj: any, fullPath: string, notFoundValue?: T): T | undefined;
