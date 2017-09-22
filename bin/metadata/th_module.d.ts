/// <reference types="express" />
import { ThMiddlewareImplements } from "./th_middleware";
import { RequestHandler } from "express";
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
    basePath?: string;
    /**
     * Import all controllers.
     *
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
    controllers?: any[];
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
    models?: any[];
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
    routers?: any[];
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
    imports?: any[];
    /**
     * Exports Controllers and Models to the parent module.
     */
    exports?: any[];
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
    middlewares?: [ThMiddlewareImplements | RequestHandler];
}
export declare const ThModule: ThModuleDecorator;
/**
 * @internal
 * @hidden
 */
export interface ThModuleDecorator {
    (obj?: ThModule): ClassDecorator;
}
