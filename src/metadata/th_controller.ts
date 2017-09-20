/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import {createClassDecorator} from "./util";

/**
 * @external Controller
 * @whatItDoes Controller Decorator
 *
 * <pre><code>
 *  @ThController()
 * class MyController {}
 *
 *  @ThModule({
 *  controllers: [ MyController ]
 * })
 * class MyMainModule {
 *  constructor(myController: MyController) {}
 * }
 * </pre></code>
 *
 * @description
 * Used to inform that the class is a component and may have its dependencies injected.
 *
 * @stable
 */
export interface ThController { (): ThController }

export const ThController = <ThControllerDecorator>createClassDecorator("ThController");

/**
 * @internal
 * @hidden
 */
export interface ThControllerDecorator { (): ClassDecorator }