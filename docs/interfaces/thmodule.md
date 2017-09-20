[thints](../README.md) > [ThModule](../interfaces/thmodule.md)



# Interface: ThModule

*__module__*: Decorators/ThModule

*__whatitdoes__*: ThModule Decorator

     @ThModule()
    class MyMainModule {
     constructor(myController: MyController) {}
    }

*__description__*: Used to inform that the class is a module.

*__stable__*: 



## Properties
<a id="basepath"></a>

### «Optional» basePath

**●  basePath**:  *`undefined`⎮`string`* 

*Defined in [metadata.ts:94](https://github.com/murilopl/ThinTS/blob/master/src/metadata.ts#L94)*



Used to defined point start all children routers.

## Exemple

     @ThRouter('/users')
    class Users {
     @GET('/')
     list(req, res) {
       res.json({users: [1,2,3,4,5]}
     }
    }




___

<a id="controllers"></a>

### «Optional» controllers

**●  controllers**:  *`any`[]* 

*Defined in [metadata.ts:128](https://github.com/murilopl/ThinTS/blob/master/src/metadata.ts#L128)*



Import all controllers.
*__example__*:     
     @ThController()
    class ConsoleController {
     log(text: string) {
      console.log(text)
     }
    }
     @ThController()
    class FooController {
     foo: 'bar';
     constructor(consoleCtrl: ConsoleController) {
       consoleCtrl.log(this.foo); // bar
     }
    }
     @ThModule({
     controllers: [
       FooController,
       ConsoleController
     ]
    })
    class MyModule {}





___

<a id="imports"></a>

### «Optional» imports

**●  imports**:  *`any`[]* 

*Defined in [metadata.ts:247](https://github.com/murilopl/ThinTS/blob/master/src/metadata.ts#L247)*



Import all childrens modules.

## Exemple

     @ThRouter('/users')
    class UsersRouter {
     constructor(private securityController: SecurityController){}
     @PUT('/ban')
     create(req: Request, res: Response) {
        this.securityController.ban(req.user.id);
        res.json();
     }
    }
     @ThModule({
     basePath: '/v1',
     routers: [
       UsersRouter
     ]
    })
    class UsersModule {}
     @ThController()
    class SecurityController {
      ban(user_id: number) {}
    }
     @ThModule({
     imports: [
      UsersModule
     ],
     controllers: [
      SecurityController
     ]
    })
    class MyModule {}




___

<a id="middlewares"></a>

### «Optional» middlewares

**●  middlewares**:  *`any`[]* 

*Defined in [metadata.ts:290](https://github.com/murilopl/ThinTS/blob/master/src/metadata.ts#L290)*



Import middlewares be used in this routers and all childrens module routers.

## Exemple

     @ThController()
    class LogController {
     info(data: any) {
       console.log(data)
     }
    }
     @Middleware()
    class PassportAuthMiddleware implements MiddlewareHandler {
     constructor(private logCtrl: LogController) {}
     handler(req: Request, res: Response, next: NextFunction) {
       this.logCtrl.info(req);
       next();
     }
    }
     @ThModule({
     routers: [
       UsersRouter
     ],
     controllers: [
       UsersController
     ],
     middlewares: [
       PassportAuthMiddleware
     ]
    })
    class MyModule {}




___

<a id="models"></a>

### «Optional» models

**●  models**:  *`any`[]* 

*Defined in [metadata.ts:165](https://github.com/murilopl/ThinTS/blob/master/src/metadata.ts#L165)*



Import all models.

## Exemple

     @ThModel()
    class UserModel {
     create(user: any) {
       return new User(any);
     }
    }
     @ThController()
    class UsersController {
     constructor(private userModel: UserModel) {}
     create(user: any) {
       user.id = md5();
       return this.userModel.create(user);
     }
    }
     @ThModule({
     models: [
       UserModel
     ],
     controllers: [
       UsersController
     ]
    })
    class MyModule {}




___

<a id="routers"></a>

### «Optional» routers

**●  routers**:  *`any`[]* 

*Defined in [metadata.ts:202](https://github.com/murilopl/ThinTS/blob/master/src/metadata.ts#L202)*



Import all routers.

## Exemple

     @ThRouter('/users')
    class UsersRouter {
     constructor(private usersController: UsersController){}
     @GET('/')
     list(req: Request, res: Response) {
       res.json({users: this.usersController.all()});
     }
     @POST('/')
     create(req: Request, res: Response) {
        const newUser = this.usersController.create(req.body);
        res.json({user: newUser});
     }
    }
     @ThModule({
     routers: [
       UsersRouter
     ],
     controllers: [
       UsersController
     ]
    })
    class MyModule {}




___


