/// <reference types="express" />
/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
import { Request, Response, NextFunction } from "express";
/**
 * Help implement a ThMiddleware
 */
export interface ThMiddlewareImplements {
    handler(req: Request, res: Response, next: NextFunction): any;
}
/**
 * @external ThMiddleware
 * @whatItDoes ThMiddleware Decorator
 *
 * <pre><code>
 *  @ThMiddleware()
 * class MyMiddleware implements ThMiddlewareImplements {
 *
 *  constructor(private myController: MyController){}
 *
 *  handler(req, res, next) {
 *    this.myController.do(req);
 *    next();
 *  }
 * }
 *
 *  @ThModule({
 *  controllers: [ MyController ],
 *  middlewares: [ MyMiddleware ]
 * })
 * class MyMainModule {
 *  constructor(myController: MyController) {}
 * }
 * </pre></code>
 *
 * @description
 * Used to inform that the class is a middleware and may have its dependencies injected.
 *
 */
export interface ThMiddleware {
}
export declare const ThMiddleware: ThMiddlewareDecorator;
/**
 * @internal
 * @hidden
 */
export interface ThMiddlewareDecorator {
    (): ClassDecorator;
}
