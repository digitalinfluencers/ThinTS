/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
import {ExpressController, ExpressControllerConfig} from "./controllers/express_controller";
import {InjectorBranch, InjectorBranch_} from "./di/injector_tree";
import {ModuleResolver} from "./module_resolver";
import {ThModule} from "./metadata/th_module";
import {LogController} from "./controllers/log.controller";
import {InjectorToken} from "./di/injector_token";

export interface MainApplicationConfig extends ExpressControllerConfig {}


export const MAIN_CHILD_MODULES   = InjectorToken.create('MAIN_CHILD_MODULES');


/**
 * ThinTS start point, use MainApplication.bootstrap to resolve your app module.
 */


@ThModule({
    controllers: [
        LogController
    ]
})
export class MainApplication {

    static moduleResolver: ModuleResolver;

    constructor(injectorBranch: InjectorBranch) {}

    static get injectorTree() {
        return this.moduleResolver.getInjectorTree();
    }

    static getChildResolvers(): Map<any, ModuleResolver> {
        return <Map<any, ModuleResolver>>this.injectorTree.get(MAIN_CHILD_MODULES)
    }

    /** @deprecated */
    static bootstrap(apiModule: any, config?: MainApplicationConfig) {
        console.warn("MainApplication.bootstrap are deprecated, please use bootstrap instead.");
        return bootstrap(apiModule, config);
    }

}

export function bootstrap(apiModule: any, config: MainApplicationConfig = {}): ModuleResolver {
    let mainResolved: ModuleResolver;
    if (MainApplication.moduleResolver instanceof ModuleResolver) {
        mainResolved = MainApplication.moduleResolver;
    } else {
        mainResolved = ModuleResolver.create(MainApplication, undefined, [
            {token: MAIN_CHILD_MODULES, value: new Map()}
        ]);
        MainApplication.moduleResolver = mainResolved
    }
    const apiResolved  = ModuleResolver.create(apiModule, mainResolved, [ExpressController]);
    (<any>mainResolved).childrens.push(apiResolved);

    const mainChildModules = <Map<any, ModuleResolver>>mainResolved.getInjectorTree().get(MAIN_CHILD_MODULES);
    mainChildModules.set(apiModule, apiResolved);
    const apiInjectorBranch = apiResolved.getInjectorTree();
    const expressController = <ExpressController>apiInjectorBranch.get(ExpressController);
    expressController.setConfig(config);

    return apiResolved;
}
