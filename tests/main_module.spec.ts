/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import {ThModule, ThController, ModuleResolver, MainApplication, ExpressController} from "../src/";
import {bootstrap} from "../src/main_application";


@ThController()
class NotDeclaredController {}

@ThController()
class DeclaredController {
    a = 0;
}

@ThModule({ controllers: [ DeclaredController ], exports: [ DeclaredController ] })
class ThModuleSpec {
    constructor(public declaredController: DeclaredController) {
        declaredController.a = 10;
    }
}

@ThModule({
    imports: [
        ThModuleSpec
    ]
})
class ThModuleSpecTwo {
    constructor(public declaredController: DeclaredController) {}
}


describe("MainApplication", () => {

    const thModuleResolver = bootstrap(ThModuleSpec, {
        http: { autostart: false }
    });

    const thModuleResolverTwo = bootstrap(ThModuleSpecTwo, {
        http: { autostart: false }
    });

    const mainAppModuleResolver = MainApplication.moduleResolver;

    it("should be have a ThModuleSpec ModuleResolver instance", () => {
        const instance = mainAppModuleResolver.getChildren(ThModuleSpec);
        expect(instance).not.toBeUndefined();
        expect(instance).not.toBeNull();
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

    it("should be have a ThModuleSpecTwo ModuleResolver instance", () => {
        const instance = mainAppModuleResolver.getChildren(ThModuleSpecTwo);
        expect(instance).not.toBeUndefined();
        expect(instance).not.toBeNull();
    });

    it("should be inherited a DeclaredController in ThModuleSpecTwo with ThModuleSpec exports", () => {
        const instance = mainAppModuleResolver.getChildren(ThModuleSpecTwo);
        expect(instance.getInjectorTree()
            .get(DeclaredController))
            .toBeInstanceOf(DeclaredController);
    });

    it("should be injected a DeclaredController in ThModuleSpecTwo", () => {
        const thModuleSpecTwoResolver = mainAppModuleResolver.getChildren(ThModuleSpecTwo);
        const thModuleSpecTwo = <ThModuleSpecTwo>thModuleSpecTwoResolver.getModuleInstance();
        expect(thModuleSpecTwo.declaredController).toBeInstanceOf(DeclaredController);
        expect(thModuleSpecTwo.declaredController.a).toBe(10);
    });

});