/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
import { ExpressController, InjectorBranch, ModuleResolver } from "./index";
export declare class MainApplication {
    constructor(expressController: ExpressController, injectorBranch: InjectorBranch);
    static bootstrap(apiModule: any): ModuleResolver;
}
