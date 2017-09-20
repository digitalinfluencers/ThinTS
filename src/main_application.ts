/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { ExpressController, InjectorBranch, ModuleResolver, ThModule } from "./core";


@ThModule({
    controllers: [
        ExpressController
    ]
})
export class MainApplication {

    constructor(expressController: ExpressController, injectorBranch: InjectorBranch) {}

    static bootstrap(apiModule: any) {
        const mainResolved = ModuleResolver.create(MainApplication);
        const apiResolved  = ModuleResolver.create(apiModule, mainResolved);
    }

}