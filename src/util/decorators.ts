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