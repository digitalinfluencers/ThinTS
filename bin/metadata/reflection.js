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
class Reflection {
    static parameters(cls) {
        return Reflect.getOwnMetadata("design:paramtypes", cls) || [];
    }
    static decorators(cls) {
        return Reflect.getOwnMetadata("decorators", cls) || [];
    }
}
exports.Reflection = Reflection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXRhZGF0YS9yZWZsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7O0FBRUg7OztHQUdHO0FBQ0g7SUFFSSxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQVE7UUFDdEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2xFLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQVE7UUFDdEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzRCxDQUFDO0NBRUo7QUFWRCxnQ0FVQyJ9