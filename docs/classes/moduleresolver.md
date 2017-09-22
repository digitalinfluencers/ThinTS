[thints](../README.md) > [ModuleResolver](../classes/moduleresolver.md)



# Class: ModuleResolver


Responsible to compile and manage all modules.

## Index

### Methods

* [getChildren](moduleresolver.md#getchildren)
* [getInjectorTree](moduleresolver.md#getinjectortree)
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




*Defined in [module_resolver.ts:26](https://github.com/digitalinfluencers/ThinTS/blob/097d17e/src/module_resolver.ts#L26)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cls | `any`   |  - |





**Returns:** [ModuleResolver](moduleresolver.md)⎮`null`




*Defined in [module_resolver.ts:27](https://github.com/digitalinfluencers/ThinTS/blob/097d17e/src/module_resolver.ts#L27)*



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




*Defined in [module_resolver.ts:23](https://github.com/digitalinfluencers/ThinTS/blob/097d17e/src/module_resolver.ts#L23)*





**Returns:** [InjectorBranch](injectorbranch.md)





___

<a id="getmoduleinstance"></a>

###  getModuleInstance

► **getModuleInstance**(): `any`




*Defined in [module_resolver.ts:28](https://github.com/digitalinfluencers/ThinTS/blob/097d17e/src/module_resolver.ts#L28)*





**Returns:** `any`





___

<a id="getparent"></a>

###  getParent

► **getParent**(): [ModuleResolver](moduleresolver.md)⎮`null`




*Defined in [module_resolver.ts:24](https://github.com/digitalinfluencers/ThinTS/blob/097d17e/src/module_resolver.ts#L24)*





**Returns:** [ModuleResolver](moduleresolver.md)⎮`null`





___

<a id="getrouter"></a>

###  getRouter

► **getRouter**(): `Router`




*Defined in [module_resolver.ts:25](https://github.com/digitalinfluencers/ThinTS/blob/097d17e/src/module_resolver.ts#L25)*





**Returns:** `Router`





___

<a id="create"></a>

### «Static» create

► **create**(module: *`any`*, parent?: *[ModuleResolver](moduleresolver.md)*): [ModuleResolver](moduleresolver.md)




*Defined in [module_resolver.ts:29](https://github.com/digitalinfluencers/ThinTS/blob/097d17e/src/module_resolver.ts#L29)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| module | `any`   |  - |
| parent | [ModuleResolver](moduleresolver.md)   |  - |





**Returns:** [ModuleResolver](moduleresolver.md)





___


