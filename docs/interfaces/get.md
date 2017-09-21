[thints](../README.md) > [GET](../interfaces/get.md)



# Interface: GET

*__whatitdoes__*: ThRouter GET

     @ThRouter('/my')
    class MyRouter {
     @GET('/all')
     getAll(req: Request, res: Response) {
       res.json({all: []})
     }
    }

or

     @ThRouter('/my')
    class MyRouter {
     @GET()
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

*Defined in [metadata/th_router_methods.ts:47](https://github.com/murilopl/ThinTS/blob/48f46de/src/metadata/th_router_methods.ts#L47)*





___


