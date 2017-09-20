/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */



import {createClassDecorator} from "./util";

/**
 * @external ThModel
 * @whatItDoes ThModel Decorator
 *
 * <pre><code>
 *  @ThModel()
 * class MyModel {}
 *
 *  @ThModule({
 *  models: [ MyModel ]
 * })
 * class MyMainModule {
 *  constructor(myModel: MyModel) {}
 * }
 * </pre></code>
 *
 * @description
 * Used to inform that the class is a component and may have its dependencies injected.
 *
 * @stable
 */
export interface ThModel { (): ThModel }

export const ThModel = <ThModelDecorator>createClassDecorator("ThModel");

/**
 * @internal
 * @hidden
 */
export interface ThModelDecorator { (): ClassDecorator }