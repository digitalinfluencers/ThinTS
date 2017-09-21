/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import {ThModule, ThController, MainApplication} from "../src/";


@ThController() class ThControllerOne { n: number; }
@ThController() class ThControllerTwo {}

@ThModule({ controllers: [ ThControllerTwo ] })
class ThModuleChildren {
    constructor(public ctrlOne: ThControllerOne, public ctrlTwo: ThControllerTwo) {}
}

@ThModule({
    imports: [ ThModuleChildren ],
    controllers: [ ThControllerOne ]
})
class ThModuleParent {
    constructor(ctrlOne: ThControllerOne) {
        ctrlOne.n = 1;
    }
}


describe("ThModule", () => {

    const mainModuleResolver = MainApplication.bootstrap(ThModuleParent);
    const thModuleParentResolver = mainModuleResolver.getChildren(ThModuleParent);

    it("should be imported ThModuleChildren", () => {
        const children = thModuleParentResolver.getChildren(ThModuleChildren);
        expect(children).not.toBeNull();
        expect(children).not.toBeUndefined();
        expect(children.getModuleInstance()).toBeInstanceOf(ThModuleChildren);
    });

    it("should be inherited the dependencies of ThModuleParent", () => {
        const childrenModuleResolver = thModuleParentResolver.getChildren(ThModuleChildren);
        const childrenModuleInstance = <ThModuleChildren>childrenModuleResolver.getModuleInstance();

        expect(childrenModuleInstance.ctrlOne).toBeInstanceOf(ThControllerOne);
        expect(childrenModuleInstance.ctrlOne.n).toBe(1);
        expect(childrenModuleInstance.ctrlTwo).toBeInstanceOf(ThControllerTwo);
    });

});