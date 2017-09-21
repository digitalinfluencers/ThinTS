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
export declare function checkClassHasDecoratorType(type: string, cls: any): boolean;
/**
 * @internal
 * @hidden
 * @param {string} name
 * @returns {(metadata?: any) => (target: any) => any}
 */
export declare function createClassDecorator(name: string): (metadata?: any) => (target: any) => any;
/**
 * @internal
 * @hidden
 * @param {string} name
 * @returns (...args: any[]) => (target: Object, propertyKey: (string | symbol), descriptor: any) => Object
 */
export declare function createMethodDecorator(name: string): (...args: any[]) => (target: Object, propertyKey: string | symbol, descriptor: any) => Object;
