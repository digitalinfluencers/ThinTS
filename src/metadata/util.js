"use strict";
/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var reflection_1 = require("./reflection");
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
    var decorators = reflection_1.Reflection.decorators(cls);
    for (var _i = 0, decorators_1 = decorators; _i < decorators_1.length; _i++) {
        var name_1 = decorators_1[_i].name;
        if (name_1 === type) {
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
            var decorators = Reflect.getOwnMetadata("decorators", target) || [];
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
    function DecoratorMetadataFactory() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!(Reflect && Reflect.getOwnMetadataKeys)) {
            throw new Error("reflect-metadata is required.");
        }
        function Decorator(target, propertyKey, descriptor) {
            var decorators = Reflect.getOwnMetadata("decorators", target) || [];
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
var DecoratorMetadata = /** @class */ (function () {
    function DecoratorMetadata(name, metadata) {
        if (metadata === void 0) { metadata = {}; }
        this.name = name;
        this.metadata = metadata;
    }
    DecoratorMetadata.prototype.is = function (name) {
        return this.name === name;
    };
    DecoratorMetadata.prototype.toString = function () {
        return "@" + this.name;
    };
    return DecoratorMetadata;
}());
