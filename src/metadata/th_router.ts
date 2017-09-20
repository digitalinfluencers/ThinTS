/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import {createClassDecorator} from "./util";


/**
 * @whatItDoes ThRouter Decorator
 *
 * <pre><code>
 *  @ThRouter('/my')
 * class MyRouter {}
 *
 *  @ThModule({
 *  routers: [ MyRouter ]
 * })
 * class MyMainModule {}
 * </pre></code>
 *
 * @description
 * Used to inform that the class is as router handler.
 *
 * @stable
 */
export interface ThRouter { path?: string }

export const ThRouter = <ThRouterDecorator>createClassDecorator('ThRouter');

/**
 * @internal
 * @hidden
 */
export interface ThRouterDecorator{ (path?: string): ClassDecorator }