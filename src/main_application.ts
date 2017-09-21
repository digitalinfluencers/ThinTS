/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { ExpressController, InjectorBranch, ModuleResolver, ThModule } from "./index";


@ThModule({
    controllers: [
        ExpressController
    ]
})
export class MainApplication {

    constructor(expressController: ExpressController, injectorBranch: InjectorBranch) {}

    static bootstrap(apiModule: any): ModuleResolver {
        const mainResolved = ModuleResolver.create(MainApplication);
        const apiResolved  = ModuleResolver.create(apiModule, mainResolved);
        return mainResolved;
    }

}