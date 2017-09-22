[thints](../README.md) > [PATCH](../interfaces/patch.md)



# Interface: PATCH

*__external__*: ThRouter PATCH

*__whatitdoes__*: Patch Decorator

     @ThRouter('/my')
    class MyRouter {
     @PATCH('/all')
     getAll(req: Request, res: Response) {
       res.json({all: []})
     }
    }

or

     @ThRouter('/my')
    class MyRouter {
     @PATCH()
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

*Defined in [metadata/th_router_methods.ts:166](https://github.com/digitalinfluencers/ThinTS/blob/74882ef/src/metadata/th_router_methods.ts#L166)*





___


