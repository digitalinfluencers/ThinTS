[thints](../README.md) > [ExpressController](../classes/expresscontroller.md)



# Class: ExpressController


Responsible to manage Express App instance.

## Index

### Constructors

* [constructor](expresscontroller.md#constructor)


### Methods

* [getApp](expresscontroller.md#getapp)
* [setConfig](expresscontroller.md#setconfig)
* [startHttp](expresscontroller.md#starthttp)
* [startHttps](expresscontroller.md#starthttps)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new ExpressController**(logCtrl: *[LogController](logcontroller.md)*): [ExpressController](expresscontroller.md)



*Defined in [controllers/express_controller.ts:43](https://github.com/digitalinfluencers/ThinTS/blob/5a1867c/src/controllers/express_controller.ts#L43)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| logCtrl | [LogController](logcontroller.md)   |  - |





**Returns:** [ExpressController](expresscontroller.md)

---



## Methods
<a id="getapp"></a>

###  getApp

► **getApp**(): `express.Application`




*Defined in [controllers/express_controller.ts:49](https://github.com/digitalinfluencers/ThinTS/blob/5a1867c/src/controllers/express_controller.ts#L49)*





**Returns:** `express.Application`





___

<a id="setconfig"></a>

###  setConfig

► **setConfig**(config: *[ExpressControllerConfig](../interfaces/expresscontrollerconfig.md)*): `void`




*Defined in [controllers/express_controller.ts:53](https://github.com/digitalinfluencers/ThinTS/blob/5a1867c/src/controllers/express_controller.ts#L53)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| config | [ExpressControllerConfig](../interfaces/expresscontrollerconfig.md)   |  - |





**Returns:** `void`





___

<a id="starthttp"></a>

###  startHttp

► **startHttp**(): `Promise`.<`any`>




*Defined in [controllers/express_controller.ts:65](https://github.com/digitalinfluencers/ThinTS/blob/5a1867c/src/controllers/express_controller.ts#L65)*





**Returns:** `Promise`.<`any`>





___

<a id="starthttps"></a>

###  startHttps

► **startHttps**(): `Promise`.<`any`>




*Defined in [controllers/express_controller.ts:75](https://github.com/digitalinfluencers/ThinTS/blob/5a1867c/src/controllers/express_controller.ts#L75)*





**Returns:** `Promise`.<`any`>





___


