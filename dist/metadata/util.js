"use strict";
/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const reflection_1 = require("./reflection");
/**
 * @internal
 * @hidden
 * @whatItDoes Check Class Decorator
 *
 * <pre><code>
 *  @ThModule()
 * class MyModule {}
 *
 * checkClassHasDecoratorType('ThModule', MyModule); // true
 * checkClassHasDecoratorType('ThRouter', MyModule); // false
 * </pre></code>
 *
 * @description
 * Returns the boolean value that represents whether
 * the past class has the decorator or not.
 *
 * @stable
 */
function checkClassHasDecoratorType(type, cls) {
    const decorators = reflection_1.Reflection.decorators(cls);
    for (const { name } of decorators) {
        if (name === type) {
            return true;
        }
    }
    return false;
}
exports.checkClassHasDecoratorType = checkClassHasDecoratorType;
/**
 * @internal
 * @hidden
 * @param {string} name
 * @returns {(metadata?: any) => (target: any) => any}
 */
function createClassDecorator(name) {
    function DecoratorMetadataFactory(metadata) {
        if (!(Reflect && Reflect.getOwnMetadataKeys)) {
            throw new Error("reflect-metadata is required.");
        }
        function Decorator(target) {
            const decorators = Reflect.getOwnMetadata("decorators", target) || [];
            decorators.push(new DecoratorMetadata(name, metadata));
            Reflect.defineMetadata("decorators", decorators, target);
            return target;
        }
        return Decorator;
    }
    return DecoratorMetadataFactory;
}
exports.createClassDecorator = createClassDecorator;
/**
 * @internal
 * @hidden
 * @param {string} name
 * @returns (...args: any[]) => (target: Object, propertyKey: (string | symbol), descriptor: any) => Object
 */
function createMethodDecorator(name) {
    function DecoratorMetadataFactory(...args) {
        if (!(Reflect && Reflect.getOwnMetadataKeys)) {
            throw new Error("reflect-metadata is required.");
        }
        function Decorator(target, propertyKey, descriptor) {
            const decorators = Reflect.getOwnMetadata("decorators", target) || [];
            decorators.push(new DecoratorMetadata(name, {
                method: propertyKey,
                args: args
            }));
            Reflect.defineMetadata("decorators", decorators, target);
            return target;
        }
        return Decorator;
    }
    return DecoratorMetadataFactory;
}
exports.createMethodDecorator = createMethodDecorator;
/**
 * @internal
 * @hidden
 */
class DecoratorMetadata {
    constructor(name, metadata = {}) {
        this.name = name;
        this.metadata = metadata;
    }
    is(name) {
        return this.name === name;
    }
    toString() {
        return `@${this.name}`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXRhZGF0YS91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7O0FBRUgsNkNBQXdDO0FBRXhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxvQ0FBMkMsSUFBWSxFQUFFLEdBQVE7SUFDN0QsTUFBTSxVQUFVLEdBQUcsdUJBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO0lBQ0wsQ0FBQztJQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQVJELGdFQVFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCw4QkFBcUMsSUFBWTtJQUU3QyxrQ0FBa0MsUUFBYztRQUM1QyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQyxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFDckQsQ0FBQztRQUVELG1CQUFvQixNQUFXO1lBQzNCLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN0RSxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDdkQsT0FBTyxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3pELE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUdELE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQztBQUNwQyxDQUFDO0FBbEJELG9EQWtCQztBQUdEOzs7OztHQUtHO0FBQ0gsK0JBQXNDLElBQVk7SUFFOUMsa0NBQWtDLEdBQUcsSUFBVztRQUM1QyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQyxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFDckQsQ0FBQztRQUVELG1CQUFvQixNQUFjLEVBQUUsV0FBNEIsRUFBRSxVQUFlO1lBQzdFLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN0RSxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsSUFBSSxFQUFFO2dCQUN4QyxNQUFNLEVBQUUsV0FBVztnQkFDbkIsSUFBSSxFQUFFLElBQUk7YUFDYixDQUFDLENBQUMsQ0FBQztZQUNKLE9BQU8sQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN6RCxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxNQUFNLENBQUMsd0JBQXdCLENBQUM7QUFDcEMsQ0FBQztBQXBCRCxzREFvQkM7QUFFRDs7O0dBR0c7QUFDSDtJQUNJLFlBQW1CLElBQVksRUFBUyxXQUFnQixFQUFFO1FBQXZDLFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQUcsQ0FBQztJQUU5RCxFQUFFLENBQUMsSUFBWTtRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQztJQUM5QixDQUFDO0lBRUQsUUFBUTtRQUNKLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0NBQ0oifQ==