


#  thints

## Index

### Classes

* [ExpressController](classes/expresscontroller.md)
* [InjectorBranch](classes/injectorbranch.md)
* [MainApplication](classes/mainapplication.md)
* [ModuleResolver](classes/moduleresolver.md)


### Interfaces

* [DELETE](interfaces/delete.md)
* [GET](interfaces/get.md)
* [PARAM](interfaces/param.md)
* [PATCH](interfaces/patch.md)
* [POST](interfaces/post.md)
* [PUT](interfaces/put.md)
* [ThController](interfaces/thcontroller.md)
* [ThMiddleware](interfaces/thmiddleware.md)
* [ThMiddlewareImplements](interfaces/thmiddlewareimplements.md)
* [ThModel](interfaces/thmodel.md)
* [ThModule](interfaces/thmodule.md)
* [ThModuleWithExports](interfaces/thmodulewithexports.md)
* [ThRouter](interfaces/throuter.md)


### Functions

* [_throwNull](#_thrownull)
* [resolveDeps](#resolvedeps)



---
# Functions
<a id="_thrownull"></a>

###  _throwNull

► **_throwNull**(target: *`any`*, dep: *`any`*): `void`




*Defined in [util.ts:61](https://github.com/digitalinfluencers/ThinTS/blob/4b9e250/src/util.ts#L61)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| target | `any`   |  - |
| dep | `any`   |  - |





**Returns:** `void`





___

<a id="resolvedeps"></a>

###  resolveDeps

► **resolveDeps**(cls: *`any`*, injectorTree: *[InjectorBranch](classes/injectorbranch.md)*): `any`




*Defined in [util.ts:50](https://github.com/digitalinfluencers/ThinTS/blob/4b9e250/src/util.ts#L50)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cls | `any`   |  - |
| injectorTree | [InjectorBranch](classes/injectorbranch.md)   |  - |





**Returns:** `any`





___


