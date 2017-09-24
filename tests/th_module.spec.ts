/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import {ThModule, ThController, MainApplication} from "../src/";
import {bootstrap} from "../src/main_application";


@ThController() class ThControllerOne { n: number; }
@ThController() class ThControllerTwo {}
@ThController() class ThControllerThree { a: number; }
@ThController() class ThControllerFour {}

@ThModule({
    controllers: [ ThControllerThree ],
    exports: [ ThControllerThree ]
})
class ThModuleChildrenWithExports {

    constructor(ctrlThree: ThControllerThree) {
        ctrlThree.a = 3;
    }
}

@ThModule({ controllers: [ ThControllerTwo ] })
class ThModuleChildren {
    constructor(public ctrlOne: ThControllerOne, public ctrlTwo: ThControllerTwo) {}
}

@ThModule({
    imports: [
        ThModuleChildren,
        ThModuleChildrenWithExports
    ],
    controllers: [ ThControllerOne ]
})
class ThModuleParent {
    constructor(ctrlOne: ThControllerOne, public ctrlThree: ThControllerThree) {
        ctrlOne.n = 1;
    }
}


describe("ThModule", () => {

    const thModuleParentResolver = bootstrap(ThModuleParent, {
        http: { autostart: false }
    });

    it("should be imported all childrens", () => {
        const children = thModuleParentResolver.getChildren(ThModuleChildren);
        expect(children).not.toBeNull();
        expect(children).not.toBeUndefined();
        expect(children.getModuleInstance()).toBeInstanceOf(ThModuleChildren);
    });

    it("should be inherited the dependencies of parent module", () => {
        const childrenModuleResolver = thModuleParentResolver.getChildren(ThModuleChildren);
        const childrenModuleInstance = <ThModuleChildren>childrenModuleResolver.getModuleInstance();

        expect(childrenModuleInstance.ctrlOne).toBeInstanceOf(ThControllerOne);
        expect(childrenModuleInstance.ctrlOne.n).toBe(1);
        expect(childrenModuleInstance.ctrlTwo).toBeInstanceOf(ThControllerTwo);
    });

    it("should be inherited all the exports of child module", () => {
        const parentModuleInstance = <ThModuleParent>thModuleParentResolver.getModuleInstance();
        expect(parentModuleInstance.ctrlThree).toBeInstanceOf(ThControllerThree);
        expect(parentModuleInstance.ctrlThree.a).toBe(3);
    })

});