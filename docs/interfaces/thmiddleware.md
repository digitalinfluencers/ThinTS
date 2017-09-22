[thints](../README.md) > [ThMiddleware](../interfaces/thmiddleware.md)



# Interface: ThMiddleware

*__external__*: ThMiddleware

*__whatitdoes__*: ThMiddleware Decorator

     @ThMiddleware()
    class MyMiddleware implements ThMiddlewareImplements {
     constructor(private myController: MyController){}
     handler(req, res, next) {
       this.myController.do(req);
       next();
     }
    }

*__description__*: Used to inform that the class is a middleware and may have its dependencies injected.



