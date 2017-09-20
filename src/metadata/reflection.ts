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
 */
export class Reflection {

    static parameters(cls: any) {
        return Reflect.getOwnMetadata("design:paramtypes", cls) || [];
    }

    static decorators(cls: any) {
        return Reflect.getOwnMetadata("decorators", cls) || [];
    }

}