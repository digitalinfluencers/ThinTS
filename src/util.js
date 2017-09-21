"use strict";
/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
Object.defineProperty(exports, "__esModule", { value: true });
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
