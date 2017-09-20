/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import {createClassDecorator, createMethodDecorator} from "./util/decorators";
import {Reflection} from "./util/reflection";

/**
 * @module Decorators
 */

/**
 * @internal
 * @hidden
 * @whatItDoes Check Class Decorator
 *
 * <pre><code>
 *  @ThModule()
 * class MyModule {}
 *
 * checkClassHasDecoratorType('ThModule', MyModule); // true
 * checkClassHasDecoratorType('ThRouter', MyModule); // false
 * </pre></code>
 *
 * @description
 * Returns the boolean value that represents whether
 * the past class has the decorator or not.
 *
 * @stable
 */
export function checkClassHasDecoratorType(type: string, cls: any) {
    const decorators = Reflection.decorators(cls);
    for (const {name} of decorators) {
        if (name === type) {
            return true;
        }
    }
    return false;
}

/**
 * @internal
 * @hidden
 */
export interface ThModuleDecorator { (obj?: ThModule): ClassDecorator }



/**
 * @module Decorators/ThModule
 * @whatItDoes ThModule Decorator
 *
 * <pre><code>
 *  @ThModule()
 * class MyMainModule {
 *  constructor(myController: MyController) {}
 * }
 * </pre></code>
 *
 * @description
 * Used to inform that the class is a module.
 *
 * @stable
 */
export interface ThModule {

    /**
     * Used to defined point start all children routers.
     *
     * ## Exemple
     *
     * <pre><code>
     *  @ThRouter('/users')
     * class Users {
     *  @GET('/')
     *  list(req, res) {
     *    res.json({users: [1,2,3,4,5]}
     *  }
     * }
     *
     *  @ThModule({
     *  basePath: '/api'
     * })
     * class MyModule {}
     * </pre></code>
     *
     * /api/users => {users: [1,2,3,4,5]}
     *
     */
    basePath?: string,

    /**
     * Import all controllers.
     *
     * @example
     * <pre><code>
     *
     *  @ThController()
     * class ConsoleController {
     *  log(text: string) {
     *   console.log(text)
     *  }
     * }
     *
     *  @ThController()
     * class FooController {
     *  foo: 'bar';
     *
     *  constructor(consoleCtrl: ConsoleController) {
     *    consoleCtrl.log(this.foo); // bar
     *  }
     * }
     *
     *  @ThModule({
     *  controllers: [
     *    FooController,
     *    ConsoleController
     *  ]
     * })
     * class MyModule {}
     *
     * </pre></code>
     */
    controllers?: any[],

    /**
     * Import all models.
     *
     * ## Exemple
     *
     * <pre><code>
     *  @ThModel()
     * class UserModel {
     *  create(user: any) {
     *    return new User(any);
     *  }
     * }
     *
     *  @ThController()
     * class UsersController {
     *  constructor(private userModel: UserModel) {}
     *
     *  create(user: any) {
     *    user.id = md5();
     *    return this.userModel.create(user);
     *  }
     * }
     *
     *  @ThModule({
     *  models: [
     *    UserModel
     *  ],
     *  controllers: [
     *    UsersController
     *  ]
     * })
     * class MyModule {}
     *
     * </pre></code>
     */
    models?: any[],

    /**
     * Import all routers.
     *
     * ## Exemple
     *
     * <pre><code>
     *  @ThRouter('/users')
     * class UsersRouter {
     *
     *  constructor(private usersController: UsersController){}
     *
     *  @GET('/')
     *  list(req: Request, res: Response) {
     *    res.json({users: this.usersController.all()});
     *  }
     *
     *  @POST('/')
     *  create(req: Request, res: Response) {
     *     const newUser = this.usersController.create(req.body);
     *     res.json({user: newUser});
     *  }
     * }
     *
     *  @ThModule({
     *  routers: [
     *    UsersRouter
     *  ],
     *  controllers: [
     *    UsersController
     *  ]
     * })
     * class MyModule {}
     *
     * </pre></code>
     */
    routers?: any[],

    /**
     * Import all childrens modules.
     *
     * ## Exemple
     *
     * <pre><code>
     *  @ThRouter('/users')
     * class UsersRouter {
     *
     *  constructor(private securityController: SecurityController){}
     *
     *  @PUT('/ban')
     *  create(req: Request, res: Response) {
     *     this.securityController.ban(req.user.id);
     *     res.json();
     *  }
     * }
     *
     *  @ThModule({
     *  basePath: '/v1',
     *  routers: [
     *    UsersRouter
     *  ]
     * })
     * class UsersModule {}
     *
     *  @ThController()
     * class SecurityController {
     *   ban(user_id: number) {}
     * }
     *
     *  @ThModule({
     *  imports: [
     *   UsersModule
     *  ],
     *  controllers: [
     *   SecurityController
     *  ]
     * })
     * class MyModule {}
     *
     * </pre></code>
     */
    imports?: any[],

    /**
     * Import middlewares be used in this routers and all childrens module routers.
     *
     * ## Exemple
     *
     * <pre><code>
     *  @ThController()
     * class LogController {
     *
     *  info(data: any) {
     *    console.log(data)
     *  }
     *
     * }
     *
     *  @Middleware()
     * class PassportAuthMiddleware implements MiddlewareHandler {
     *
     *  constructor(private logCtrl: LogController) {}
     *
     *  handler(req: Request, res: Response, next: NextFunction) {
     *    this.logCtrl.info(req);
     *    next();
     *  }
     * }
     *
     *  @ThModule({
     *  routers: [
     *    UsersRouter
     *  ],
     *  controllers: [
     *    UsersController
     *  ],
     *  middlewares: [
     *    PassportAuthMiddleware
     *  ]
     * })
     * class MyModule {}
     *
     * </pre></code>
     */
    middlewares?: any[]

}
export const ThModule = <ThModuleDecorator>createClassDecorator('ThModule');

/**
 * @internal
 * @hidden
 */
export interface ThControllerDecorator { (): ClassDecorator }

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
export interface ThModelDecorator { (): ClassDecorator }

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
export interface ThRouterDecorator{ (path?: string): ClassDecorator }

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

export const POST = <POST_Decorator>createMethodDecorator('GET');

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

export const PUT = <PUT_Decorator>createMethodDecorator('GET');

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

export const PATCH = <PATCH_Decorator>createMethodDecorator('GET');

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

export const DELETE = <DELETE_Decorator>createMethodDecorator('GET');

/**
 * @internal
 * @hidden
 */
export interface PARAM_Decorator{ (name: string): MethodDecorator }

export interface PARAM { name: string }

export const PARAM = <PARAM_Decorator>createMethodDecorator('PARAM');