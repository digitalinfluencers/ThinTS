[thints](../README.md) > [PUT](../interfaces/put.md)



# Interface: PUT

*__external__*: ThRouter PUT

*__whatitdoes__*: Put Decorator

     @ThRouter('/my')
    class MyRouter {
     @PUT('/all')
     getAll(req: Request, res: Response) {
       res.json({all: []})
     }
    }

or @ThRouter('/my') class MyRouter { @PUT() all(req: Request, res: Response) { res.json({all: []}) } }

*__description__*: Used to inform http method and path in router. If you not pass the path name, router name will be used.

*__stable__*: 



## Properties
<a id="path"></a>

### «Optional» path

**●  path**:  *`undefined`⎮`string`* 

*Defined in [metadata/th_router_methods.ts:126](https://github.com/digitalinfluencers/ThinTS/blob/15301d5/src/metadata/th_router_methods.ts#L126)*





___


