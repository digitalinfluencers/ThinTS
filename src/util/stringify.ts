/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */


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