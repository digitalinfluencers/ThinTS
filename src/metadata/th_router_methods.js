"use strict";
/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
exports.GET = util_1.createMethodDecorator('GET');
exports.POST = util_1.createMethodDecorator('GET');
exports.PUT = util_1.createMethodDecorator('GET');
exports.PATCH = util_1.createMethodDecorator('GET');
exports.DELETE = util_1.createMethodDecorator('GET');
exports.PARAM = util_1.createMethodDecorator('PARAM');
