[thints](../README.md) > [InjectorToken](../classes/injectortoken.md)



# Class: InjectorToken


Enables inject in injector tree predefined values.

## Exemple

     const MY_TOKEN = InjectorToken.create('MY_TOKEN')
     @ThModule({
     controllers: [
       {token: MY_TOKEN, value: 'some value'}
     ]
    })
    class MyModule {
     constructor(injectorBranch: InjectorBranch) {
       console.log(injectorBranch.get(MY_TOKEN)); // 'some value'
     }
    }

## Hierarchy

**InjectorToken**

↳  [InjectorToken_](injectortoken_.md)








## Index

### Methods

* [getId](injectortoken.md#getid)
* [getToken](injectortoken.md#gettoken)
* [create](injectortoken.md#create)
* [get](injectortoken.md#get)



---
## Methods
<a id="getid"></a>

###  getId

► **getId**(): `any`




*Defined in [di/injector_token.ts:35](https://github.com/digitalinfluencers/ThinTS/blob/d7cbdeb/src/di/injector_token.ts#L35)*





**Returns:** `any`





___

<a id="gettoken"></a>

###  getToken

► **getToken**(): `any`




*Defined in [di/injector_token.ts:34](https://github.com/digitalinfluencers/ThinTS/blob/d7cbdeb/src/di/injector_token.ts#L34)*





**Returns:** `any`





___

<a id="create"></a>

### «Static» create

► **create**(token: *`any`*): [InjectorToken](injectortoken.md)




*Defined in [di/injector_token.ts:37](https://github.com/digitalinfluencers/ThinTS/blob/d7cbdeb/src/di/injector_token.ts#L37)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| token | `any`   |  - |





**Returns:** [InjectorToken](injectortoken.md)





___

<a id="get"></a>

### «Static» get

► **get**T(token: *`any`*): [InjectorToken](injectortoken.md)⎮`null`




*Defined in [di/injector_token.ts:44](https://github.com/digitalinfluencers/ThinTS/blob/d7cbdeb/src/di/injector_token.ts#L44)*



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| token | `any`   |  - |





**Returns:** [InjectorToken](injectortoken.md)⎮`null`





___


