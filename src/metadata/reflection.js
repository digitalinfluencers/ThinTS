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
 */
var Reflection = /** @class */ (function () {
    function Reflection() {
    }
    Reflection.parameters = function (cls) {
        return Reflect.getOwnMetadata("design:paramtypes", cls) || [];
    };
    Reflection.decorators = function (cls) {
        return Reflect.getOwnMetadata("decorators", cls) || [];
    };
    return Reflection;
}());
exports.Reflection = Reflection;
