# ThinTS

[![Build Status][travis-image]][travis-url] [![NPM Version][npm-image]][npm-url]

A simple, angular based and typed framework for RestAPIs with [node](http://nodejs.org).

# Installation
```bash
$ npm install thints --save
```

# QuickStart
Quick example.
```TypeScript
import {MainApplication, ThModule, ThController, ThRouter, GET} from "thints";

@ThController()
class ExampleController {
    private name = 'ThinTS';
    getMyName() {
        return this.name;
    }
}

@ThRouter('/name')
class ExampleRouter {
    constructor(private exampleCtrl: ExampleController) {}
    
    @GET('/') myname(req: Request, res: Response) {
    	const myname = this.exampleCtrl.getMyName();
    	res.json({myname});
    }
}

@ThModule({
    basePath: '/api',
    controllers: [ ExampleController ],
    routers: [ ExampleRouter ]
})
class MyApiModule {}

MainApplication.bootstrap(MyApiModule);
```

A GET request to 'url/api/name' call ExampleRouter and return:
```json
{ "myname": "ThinTs" }
```


# Usage
###### [TypeDocs](docs/README.md)
* [Core](#1)
  * [MainApplication](#1.1)
  * [ThModule](#1.2)
  * [ThController](#1.3)
  * [ThRouter](#1.4)
  * [ThModel](#1.5)
  * [ThMiddleware](#1.6)
  * [ExpressController](#1.7)
* [Routing](#2)
  * [Introduction](#2.1)
  * [GET](#2.2)
  * [POST](#2.3)
  * [PUT](#2.4)
  * [DELETE](#2.5)
  * [PARAM](#2.6)

# <a name="1"/> Core


### <a name="1.1"/> MainApplication
ThinTS start point, responsible to bootstrap your module and create initial depedenct tree with essentials imports.
```TypeScript
MainApplication.bootstrap(MyModule);
```
###### [MORE][docs-mainapp]


<br></br>
### <a name="1.2">ThModule
Module is responsible to create scopes and declare components.
###### [MORE][docs-thmodule]

<br></br>
### <a name="1.3"> ThController
###### [MORE][docs-thcontroller]

<br></br>
### <a name="1.4"> ThRouter
###### [MORE][docs-throuter]

<br></br>
### <a name="1.5"> ThModel
###### [MORE][docs-thmodel]

<br></br>
### <a name="1.6"> ThMiddleware
###### [MORE][docs-thmodule]

<br></br>
### <a name="1.7"> ExpressController
###### [MORE][docs-thmiddleware]

<br></br>
<br></br>
# <a name="2"/> Routing

### <a name="2.1">Introduction
###### [MORE][docs-thmodule]

<br></br>
### <a name="2.2">GET
###### [MORE][docs-get]

<br></br>
### <a name="2.3">POST
###### [MORE][docs-post]

<br></br>
### <a name="2.4">PUT
###### [MORE][docs-put]

<br></br>
### <a name="2.5">DELETE
###### [MORE][docs-delete]

<br></br>
### <a name="2.6">PARAM
###### [MORE][docs-param]


# License
[MIT][license-url]

[license-url]: https://github.com/digitalinfluencers/thints/blob/master/LICENSE
[npm-image]: https://img.shields.io/npm/v/thints.svg
[npm-url]: https://www.npmjs.com/package/digitalinfluencers/thints
[travis-image]: https://img.shields.io/travis/digitalinfluencers/ThinTS.svg
[travis-url]: https://travis-ci.org/digitalinfluencers/ThinTS

[docs-mainapp]: docs/classes/mainapplication.md
[docs-thmodule]: docs/interfaces/thmodule.md
[docs-thcontroller]: docs/interfaces/thcontroller.md
[docs-throuter]: docs/interfaces/throuter.md
[docs-thmodel]: docs/interfaces/thmodel.md
[docs-thmiddleware]: docs/interfaces/thmiddleware.md
[docs-get]: docs/interfaces/get.md
[docs-post]: docs/interfaces/post.md
[docs-put]: docs/interfaces/put.md
[docs-delete]: docs/interfaces/delete.md
[docs-param]: docs/interfaces/param.md