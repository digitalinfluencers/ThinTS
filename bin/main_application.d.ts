/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
import { ExpressController } from "./express_controller";
import { InjectorBranch } from "./di/injector_tree";
import { ModuleResolver } from "./module_resolver";
/**
 * ThinTS start point, use MainApplication.bootstrap to resolve your app module.
 */
export declare class MainApplication {
    constructor(expressController: ExpressController, injectorBranch: InjectorBranch);
    static bootstrap(apiModule: any): ModuleResolver;
}
