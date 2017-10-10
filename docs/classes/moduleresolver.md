[thints](../README.md) > [ModuleResolver](../classes/moduleresolver.md)



# Class: ModuleResolver


Responsible to compile and manage all modules.

## Index

### Methods

* [getChildren](moduleresolver.md#getchildren)
* [getInjectorTree](moduleresolver.md#getinjectortree)
* [getModule](moduleresolver.md#getmodule)
* [getModuleInstance](moduleresolver.md#getmoduleinstance)
* [getParent](moduleresolver.md#getparent)
* [getRouter](moduleresolver.md#getrouter)
* [create](moduleresolver.md#create)



---
## Methods
<a id="getchildren"></a>

###  getChildren

► **getChildren**(cls: *`any`*): [ModuleResolver](moduleresolver.md)⎮`null`

► **getChildren**T(cls: *`T`*): `T`




*Defined in [module_resolver.ts:29](https://github.com/digitalinfluencers/ThinTS/blob/d0ee093/src/module_resolver.ts#L29)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cls | `any`   |  - |





**Returns:** [ModuleResolver](moduleresolver.md)⎮`null`




*Defined in [module_resolver.ts:30](https://github.com/digitalinfluencers/ThinTS/blob/d0ee093/src/module_resolver.ts#L30)*



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cls | `T`   |  - |





**Returns:** `T`





___

<a id="getinjectortree"></a>

###  getInjectorTree

► **getInjectorTree**(): [InjectorBranch](injectorbranch.md)




*Defined in [module_resolver.ts:26](https://github.com/digitalinfluencers/ThinTS/blob/d0ee093/src/module_resolver.ts#L26)*





**Returns:** [InjectorBranch](injectorbranch.md)





___

<a id="getmodule"></a>

###  getModule

► **getModule**(): `any`




*Defined in [module_resolver.ts:32](https://github.com/digitalinfluencers/ThinTS/blob/d0ee093/src/module_resolver.ts#L32)*





**Returns:** `any`





___

<a id="getmoduleinstance"></a>

###  getModuleInstance

► **getModuleInstance**(): `any`




*Defined in [module_resolver.ts:31](https://github.com/digitalinfluencers/ThinTS/blob/d0ee093/src/module_resolver.ts#L31)*





**Returns:** `any`





___

<a id="getparent"></a>

###  getParent

► **getParent**(): [ModuleResolver](moduleresolver.md)⎮`null`




*Defined in [module_resolver.ts:27](https://github.com/digitalinfluencers/ThinTS/blob/d0ee093/src/module_resolver.ts#L27)*





**Returns:** [ModuleResolver](moduleresolver.md)⎮`null`





___

<a id="getrouter"></a>

###  getRouter

► **getRouter**(): `Router`




*Defined in [module_resolver.ts:28](https://github.com/digitalinfluencers/ThinTS/blob/d0ee093/src/module_resolver.ts#L28)*





**Returns:** `Router`





___

<a id="create"></a>

### «Static» create

► **create**(module: *`any`*, parent?: *[ModuleResolver](moduleresolver.md)*, extraControllers?: *`any`[]*): [ModuleResolver](moduleresolver.md)




*Defined in [module_resolver.ts:33](https://github.com/digitalinfluencers/ThinTS/blob/d0ee093/src/module_resolver.ts#L33)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| module | `any`   |  - |
| parent | [ModuleResolver](moduleresolver.md)   |  - |
| extraControllers | `any`[]   |  - |





**Returns:** [ModuleResolver](moduleresolver.md)





___


