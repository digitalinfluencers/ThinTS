[thints](../README.md) > [MainApplication](../classes/mainapplication.md)



# Class: MainApplication


ThinTS start point, use MainApplication.bootstrap to resolve your app module.

## Index

### Constructors

* [constructor](mainapplication.md#constructor)


### Properties

* [moduleResolver](mainapplication.md#moduleresolver)


### Accessors

* [injectorTree](mainapplication.md#injectortree)


### Methods

* [bootstrap](mainapplication.md#bootstrap)
* [getChildResolvers](mainapplication.md#getchildresolvers)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new MainApplication**(injectorBranch: *[InjectorBranch](injectorbranch.md)*): [MainApplication](mainapplication.md)



*Defined in [main_application.ts:33](https://github.com/digitalinfluencers/ThinTS/blob/36b8825/src/main_application.ts#L33)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| injectorBranch | [InjectorBranch](injectorbranch.md)   |  - |





**Returns:** [MainApplication](mainapplication.md)

---


## Properties
<a id="moduleresolver"></a>

### «Static» moduleResolver

**●  moduleResolver**:  *[ModuleResolver](moduleresolver.md)* 

*Defined in [main_application.ts:33](https://github.com/digitalinfluencers/ThinTS/blob/36b8825/src/main_application.ts#L33)*





___


## Accessors
<a id="injectortree"></a>

### «Static» injectorTree


getinjectorTree(): [InjectorBranch](injectorbranch.md)


*Defined in [main_application.ts:37](https://github.com/digitalinfluencers/ThinTS/blob/36b8825/src/main_application.ts#L37)*





**Returns:** [InjectorBranch](injectorbranch.md)



___


## Methods
<a id="bootstrap"></a>

### «Static» bootstrap

► **bootstrap**(apiModule: *`any`*, config?: *[MainApplicationConfig](../interfaces/mainapplicationconfig.md)*): [ModuleResolver](moduleresolver.md)




*Defined in [main_application.ts:46](https://github.com/digitalinfluencers/ThinTS/blob/36b8825/src/main_application.ts#L46)*


*__deprecated__*: 



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| apiModule | `any`   |  - |
| config | [MainApplicationConfig](../interfaces/mainapplicationconfig.md)   |  - |





**Returns:** [ModuleResolver](moduleresolver.md)





___

<a id="getchildresolvers"></a>

### «Static» getChildResolvers

► **getChildResolvers**(): `Map`.<`any`>,.<[ModuleResolver](moduleresolver.md)>




*Defined in [main_application.ts:41](https://github.com/digitalinfluencers/ThinTS/blob/36b8825/src/main_application.ts#L41)*





**Returns:** `Map`.<`any`>,.<[ModuleResolver](moduleresolver.md)>





___


