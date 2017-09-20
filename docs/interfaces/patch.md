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

*Defined in [metadata.ts:540](https://github.com/murilopl/ThinTS/blob/master/src/metadata.ts#L540)*





___


