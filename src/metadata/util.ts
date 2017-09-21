/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import {Reflection} from "./reflection";

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
export function checkClassHasDecoratorType(type: string, cls: any) {
    if (!cls) {
        return false;
    }
    const decorators = Reflection.decorators(cls);
    for (const d of decorators) {
        if (!(d instanceof DecoratorMetadata)) {
            return false;
        }
        if (d.is(type)) {
            return true;
        }
    }
    return false;
}

/**
 * @internal
 * @hidden
 * @param {string} name
 * @returns {(metadata?: any) => (target: any) => any}
 */
export function createClassDecorator(name: string) {

    function DecoratorMetadataFactory(metadata?: any) {
        if (!(Reflect && Reflect.getOwnMetadataKeys)) {
            throw new Error("reflect-metadata is required.");
        }

        function Decorator (target: any) {
            const decorators = Reflect.getOwnMetadata("decorators", target) || [];
            decorators.push(new DecoratorMetadata(name, metadata));
            Reflect.defineMetadata("decorators", decorators, target);
            return target;
        }
        return Decorator;
    }


    return DecoratorMetadataFactory;
}


/**
 * @internal
 * @hidden
 * @param {string} name
 * @returns (...args: any[]) => (target: Object, propertyKey: (string | symbol), descriptor: any) => Object
 */
export function createMethodDecorator(name: string) {

    function DecoratorMetadataFactory(...args: any[]) {
        if (!(Reflect && Reflect.getOwnMetadataKeys)) {
            throw new Error("reflect-metadata is required.");
        }

        function Decorator (target: Object, propertyKey: string | symbol, descriptor: any) {
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

/**
 * @internal
 * @hidden
 */
class DecoratorMetadata {
    constructor(public name: string, public metadata: any = {}) {}

    is(name: string): boolean {
        return this.name === name;
    }

    toString() {
        return `@${this.name}`;
    }
}