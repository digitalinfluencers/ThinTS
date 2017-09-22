/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import {createMethodDecorator} from "./util";


/**
 * @internal
 * @hidden
 */
export interface GET_Decorator{ (path?: string): MethodDecorator }

/**
 * @whatItDoes ThRouter GET
 *
 * <pre><code>
 *  @ThRouter('/my')
 * class MyRouter {
 *  @GET('/all')
 *  getAll(req: Request, res: Response) {
 *    res.json({all: []})
 *  }
 * }
 * </pre></code>
 * or
 * <pre><code>
 *  @ThRouter('/my')
 * class MyRouter {
 *  @GET()
 *  all(req: Request, res: Response) {
 *    res.json({all: []})
 *  }
 * }
 * </pre></code>
 *
 * @description
 * Used to inform http method and path in router.
 * If you not pass the path name, router name will be used.
 *
 * @stable
 */
export interface GET { path?: string }

export const GET = <GET_Decorator>createMethodDecorator('GET');

/**
 * @internal
 * @hidden
 */
export interface POST_Decorator{ (path?: string): MethodDecorator }

/**
 * @external ThRouter POST
 * @whatItDoes ThRouter Decorator
 *
 * <pre><code>
 *  @ThRouter('/my')
 * class MyRouter {
 *  @POST('/all')
 *  getAll(req: Request, res: Response) {
 *    res.json({all: []})
 *  }
 * }
 * </pre></code>
 * or
 * <pre><code>
 *  @ThRouter('/my')
 * class MyRouter {
 *  @POST()
 *  all(req: Request, res: Response) {
 *    res.json({all: []})
 *  }
 * }
 * </pre></code>
 *
 * @description
 * Used to inform http method and path in router.
 * If you not pass the path name, router name will be used.
 *
 * @stable
 */
export interface POST { path?: string }

export const POST = <POST_Decorator>createMethodDecorator('POST');

/**
 * @internal
 * @hidden
 */
export interface PUT_Decorator{ (path?: string): MethodDecorator }

/**
 * @external ThRouter PUT
 * @whatItDoes Put Decorator
 *
 * <pre><code>
 *  @ThRouter('/my')
 * class MyRouter {
 *  @PUT('/all')
 *  getAll(req: Request, res: Response) {
 *    res.json({all: []})
 *  }
 * }
 * </pre></code>
 * or
 *  @ThRouter('/my')
 * class MyRouter {
 *  @PUT()
 *  all(req: Request, res: Response) {
 *    res.json({all: []})
 *  }
 * }
 * </pre></code>
 *
 * @description
 * Used to inform http method and path in router.
 * If you not pass the path name, router name will be used.
 *
 * @stable
 */
export interface PUT { path?: string }

export const PUT = <PUT_Decorator>createMethodDecorator('PUT');

/**
 * @internal
 * @hidden
 */
export interface PATCH_Decorator{ (path?: string): MethodDecorator }

/**
 * @external ThRouter PATCH
 * @whatItDoes Patch Decorator
 *
 * <pre><code>
 *  @ThRouter('/my')
 * class MyRouter {
 *  @PATCH('/all')
 *  getAll(req: Request, res: Response) {
 *    res.json({all: []})
 *  }
 * }
 * </pre></code>
 * or
 * <pre><code>
 *  @ThRouter('/my')
 * class MyRouter {
 *  @PATCH()
 *  all(req: Request, res: Response) {
 *    res.json({all: []})
 *  }
 * }
 * </pre></code>
 *
 * @description
 * Used to inform http method and path in router.
 * If you not pass the path name, router name will be used.
 *
 * @stable
 */
export interface PATCH { path?: string }

export const PATCH = <PATCH_Decorator>createMethodDecorator('PATCH');

/**
 * @internal
 * @hidden
 */
export interface DELETE_Decorator{ (path?: string): MethodDecorator }

/**
 * @external ThRouter DELETE
 * @whatItDoes Delete Decorator
 *
 * <pre><code>
 *  @ThRouter('/my')
 * class MyRouter {
 *  @DELETE('/all')
 *  getAll(req: Request, res: Response) {
 *    res.json({all: []})
 *  }
 * }
 * </pre></code>
 * or
 * <pre><code>
 *  @ThRouter('/my')
 * class MyRouter {
 *  @DELETE()
 *  all(req: Request, res: Response) {
 *    res.json({all: []})
 *  }
 * }
 * </pre></code>
 *
 * @description
 * Used to inform http method and path in router.
 * If you not pass the path name, router name will be used.
 *
 * @stable
 */
export interface DELETE { path?: string }

export const DELETE = <DELETE_Decorator>createMethodDecorator('DELETE');

/**
 * @internal
 * @hidden
 */
export interface PARAM_Decorator{ (name: string): MethodDecorator }

/**
 * @Todo
 */
export interface PARAM { name: string }

export const PARAM = <PARAM_Decorator>createMethodDecorator('PARAM');