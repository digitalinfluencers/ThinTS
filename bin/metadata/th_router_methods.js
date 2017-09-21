"use strict";
/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
exports.GET = util_1.createMethodDecorator('GET');
exports.POST = util_1.createMethodDecorator('GET');
exports.PUT = util_1.createMethodDecorator('GET');
exports.PATCH = util_1.createMethodDecorator('GET');
exports.DELETE = util_1.createMethodDecorator('GET');
exports.PARAM = util_1.createMethodDecorator('PARAM');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhfcm91dGVyX21ldGhvZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWV0YWRhdGEvdGhfcm91dGVyX21ldGhvZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBNkM7QUF3Q2hDLFFBQUEsR0FBRyxHQUFrQiw0QkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQXdDbEQsUUFBQSxJQUFJLEdBQW1CLDRCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0FBdUNwRCxRQUFBLEdBQUcsR0FBa0IsNEJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7QUF3Q2xELFFBQUEsS0FBSyxHQUFvQiw0QkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQXdDdEQsUUFBQSxNQUFNLEdBQXFCLDRCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0FBYXhELFFBQUEsS0FBSyxHQUFvQiw0QkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyJ9