[thints](../README.md) > [POST](../interfaces/post.md)



# Interface: POST

*__external__*: ThRouter POST

*__whatitdoes__*: ThRouter Decorator

     @ThRouter('/my')
    class MyRouter {
     @POST('/all')
     getAll(req: Request, res: Response) {
       res.json({all: []})
     }
    }

or

     @ThRouter('/my')
    class MyRouter {
     @POST()
     all(req: Request, res: Response) {
       res.json({all: []})
     }
    }

*__description__*: Used to inform http method and path in router. If you not pass the path name, router name will be used.

*__stable__*: 



## Properties
<a id="path"></a>

### «Optional» path

**●  path**:  *`undefined`⎮`string`* 

*Defined in [metadata/th_router_methods.ts:87](https://github.com/murilopl/ThinTS/blob/0e1ef2c/src/metadata/th_router_methods.ts#L87)*





___


