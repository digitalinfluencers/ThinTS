/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
import { ExpressControllerConfig } from "./controllers/express_controller";
import { InjectorBranch } from "./di/injector_tree";
import { ModuleResolver } from "./module_resolver";
import { InjectorToken } from "./di/injector_token";
export interface MainApplicationConfig extends ExpressControllerConfig {
}
export declare const MAIN_CHILD_MODULES: InjectorToken;
/**
 * ThinTS start point, use MainApplication.bootstrap to resolve your app module.
 */
export declare class MainApplication {
    static moduleResolver: ModuleResolver;
    constructor(injectorBranch: InjectorBranch);
    static readonly injectorTree: InjectorBranch;
    static getChildResolvers(): Map<any, ModuleResolver>;
    /** @deprecated */
    static bootstrap(apiModule: any, config?: MainApplicationConfig): ModuleResolver;
}
export declare function bootstrap(apiModule: any, config?: MainApplicationConfig): ModuleResolver;
