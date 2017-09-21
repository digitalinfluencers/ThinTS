/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import {ThModule, ThController, ModuleResolver, MainApplication, ExpressController} from "../src/";


@ThController()
class NotDeclaredController {}

@ThController()
class DeclaredController {}

@ThModule({ controllers: [ DeclaredController ] })
class ThModuleSpec {
    constructor(public declaredController: DeclaredController) {}
}


describe("MainApplication", () => {

    const mainAppModuleResolver = MainApplication.bootstrap(ThModuleSpec);
    const injectorTree          = mainAppModuleResolver.getInjectorTree();
    const expressController     = injectorTree.get<ExpressController>(ExpressController);

    it("should be have a ThModuleSpec ModuleResolver instance", () => {
        const instance = mainAppModuleResolver.getChildren(ThModuleSpec);
        expect(instance).not.toBeUndefined();
        expect(instance).not.toBeNull();
    });

    it("should be have a express controller", () => {
        expect(expressController).toBeInstanceOf(ExpressController);

        const expressApp = expressController.getApp();
        expect(expressApp).not.toBeNull();
        expect(expressApp).not.toBeUndefined();
    });

    it("should be not have a NotDeclaredController", () => {
        const thModuleSpecResolver = mainAppModuleResolver.getChildren(ThModuleSpec);
        expect(thModuleSpecResolver.getInjectorTree().get(NotDeclaredController)).toBeNull();
    });

    it("should be have a DeclaredController", () => {
        const instance = mainAppModuleResolver.getChildren(ThModuleSpec);
        expect(instance.getInjectorTree().get(DeclaredController)).toBeInstanceOf(DeclaredController);
    });

    it("should be have ThModuleSpec module resolver", () => {
        const thModuleSpecResolver = mainAppModuleResolver.getChildren(ThModuleSpec);
        expect(thModuleSpecResolver).toBeInstanceOf(ModuleResolver);
    });

    it("should be injected a DeclaredController in ThModuleSpec", () => {
        const thModuleSpecResolver = mainAppModuleResolver.getChildren(ThModuleSpec);
        const thModuleSpec: ThModuleSpec = thModuleSpecResolver.getModuleInstance();
        expect(thModuleSpec.declaredController).toBeInstanceOf(DeclaredController);
    });

});