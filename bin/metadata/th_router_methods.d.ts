/**
 * @internal
 * @hidden
 */
export interface GET_Decorator {
    (path?: string): MethodDecorator;
}
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
export interface GET {
    path?: string;
}
export declare const GET: GET_Decorator;
/**
 * @internal
 * @hidden
 */
export interface POST_Decorator {
    (path?: string): MethodDecorator;
}
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
export interface POST {
    path?: string;
}
export declare const POST: POST_Decorator;
/**
 * @internal
 * @hidden
 */
export interface PUT_Decorator {
    (path?: string): MethodDecorator;
}
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
export interface PUT {
    path?: string;
}
export declare const PUT: PUT_Decorator;
/**
 * @internal
 * @hidden
 */
export interface PATCH_Decorator {
    (path?: string): MethodDecorator;
}
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
export interface PATCH {
    path?: string;
}
export declare const PATCH: PATCH_Decorator;
/**
 * @internal
 * @hidden
 */
export interface DELETE_Decorator {
    (path?: string): MethodDecorator;
}
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
export interface DELETE {
    path?: string;
}
export declare const DELETE: DELETE_Decorator;
/**
 * @internal
 * @hidden
 */
export interface PARAM_Decorator {
    (name: string): MethodDecorator;
}
/**
 * @Todo
 */
export interface PARAM {
    name: string;
}
export declare const PARAM: PARAM_Decorator;
