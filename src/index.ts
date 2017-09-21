/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */


import "reflect-metadata";

/**
 * @namespace ThinTS
 * @description
 * Entry point from which you should import all public core APIs.
 */
export {ThRouter, ThModule, ThController, ThModel, GET, POST, PUT, PATCH, DELETE, PARAM} from "./metadata";
export {MainApplication} from "./main_application";
export {ExpressController} from "./express_controller";
export {InjectorBranch} from "./di/injector_tree";
export {ModuleResolver} from "./module_resolver";