


#  thints

## Index

### Classes

* [ExpressController](classes/expresscontroller.md)
* [InjectorBranch](classes/injectorbranch.md)
* [InjectorToken](classes/injectortoken.md)
* [InjectorToken_](classes/injectortoken_.md)
* [LogController](classes/logcontroller.md)
* [MainApplication](classes/mainapplication.md)
* [ModuleResolver](classes/moduleresolver.md)
* [TokenRegistry](classes/tokenregistry.md)


### Interfaces

* [DELETE](interfaces/delete.md)
* [ExpressControllerConfig](interfaces/expresscontrollerconfig.md)
* [GET](interfaces/get.md)
* [MainApplicationConfig](interfaces/mainapplicationconfig.md)
* [PARAM](interfaces/param.md)
* [PATCH](interfaces/patch.md)
* [POST](interfaces/post.md)
* [PUT](interfaces/put.md)
* [ThController](interfaces/thcontroller.md)
* [ThMiddleware](interfaces/thmiddleware.md)
* [ThMiddlewareImplements](interfaces/thmiddlewareimplements.md)
* [ThModel](interfaces/thmodel.md)
* [ThModule](interfaces/thmodule.md)
* [ThModuleDependency](interfaces/thmoduledependency.md)
* [ThRouter](interfaces/throuter.md)


### Variables

* [MAIN_CHILD_MODULES](#main_child_modules)
* [globalTokenRegistry](#globaltokenregistry)


### Functions

* [_throwNull](#_thrownull)
* [bootstrap](#bootstrap)
* [objectPath](#objectpath)
* [resolveDeps](#resolvedeps)



---
# Variables
<a id="main_child_modules"></a>

###  MAIN_CHILD_MODULES

**●  MAIN_CHILD_MODULES**:  *[InjectorToken](classes/injectortoken.md)*  =  InjectorToken.create('MAIN_CHILD_MODULES')

*Defined in [main_application.ts:18](https://github.com/digitalinfluencers/ThinTS/blob/686c6e5/src/main_application.ts#L18)*





___

<a id="globaltokenregistry"></a>

###  globalTokenRegistry

**●  globalTokenRegistry**:  *[TokenRegistry](classes/tokenregistry.md)*  =  new TokenRegistry()

*Defined in [di/injector_token.ts:85](https://github.com/digitalinfluencers/ThinTS/blob/686c6e5/src/di/injector_token.ts#L85)*





___


# Functions
<a id="_thrownull"></a>

###  _throwNull

► **_throwNull**(target: *`any`*, dep: *`any`*): `void`




*Defined in [util.ts:65](https://github.com/digitalinfluencers/ThinTS/blob/686c6e5/src/util.ts#L65)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| target | `any`   |  - |
| dep | `any`   |  - |





**Returns:** `void`





___

<a id="bootstrap"></a>

###  bootstrap

► **bootstrap**(apiModule: *`any`*, config?: *[MainApplicationConfig](interfaces/mainapplicationconfig.md)*): [ModuleResolver](classes/moduleresolver.md)




*Defined in [main_application.ts:53](https://github.com/digitalinfluencers/ThinTS/blob/686c6e5/src/main_application.ts#L53)*



**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| apiModule | `any`  | - |   - |
| config | [MainApplicationConfig](interfaces/mainapplicationconfig.md)  |  {} |   - |





**Returns:** [ModuleResolver](classes/moduleresolver.md)





___

<a id="objectpath"></a>

###  objectPath

► **objectPath**T(obj: *`any`*, fullPath: *`string`*, notFoundValue?: *[T]()*): `T`⎮`undefined`




*Defined in [util.ts:86](https://github.com/digitalinfluencers/ThinTS/blob/686c6e5/src/util.ts#L86)*



Use to get deep path in object
*__example__*:     
        const obj = { path1: { path2: { value: 'last_path' } } };
        objectPath(obj, 'path1.path2.value'); // last_path
        objectPath(obj, 'path1.path2.notexist'); // undefined
        objectPath(obj, 'path1.path2.notexist', true); // true



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| obj | `any`   |  - |
| fullPath | `string`   |  - |
| notFoundValue | [T]()   |  - |





**Returns:** `T`⎮`undefined`







___

<a id="resolvedeps"></a>

###  resolveDeps

► **resolveDeps**(cls: *`any`*, injectorTree: *[InjectorBranch](classes/injectorbranch.md)*): `any`




*Defined in [util.ts:54](https://github.com/digitalinfluencers/ThinTS/blob/686c6e5/src/util.ts#L54)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cls | `any`   |  - |
| injectorTree | [InjectorBranch](classes/injectorbranch.md)   |  - |





**Returns:** `any`





___


