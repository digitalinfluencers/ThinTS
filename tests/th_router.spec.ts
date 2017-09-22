/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import {MainApplication, ThModule, ThRouter, ThController, ExpressController, GET, PARAM} from "../src";
import {Request, Response, NextFunction} from "express";
import * as supertest from "supertest";
import {POST} from "../src/metadata/th_router_methods";



@ThController()
class SumController { sum(a: number, b: number) { return a + b; } }

@ThRouter('/sum')
class SumRouter {

    constructor(public ctrlOne: SumController) {}

    @GET('/')
    getRoot(req: Request, res: Response) {
        res.json({result: this.ctrlOne.sum(1, 1)})
    }

    @PARAM('param_a')
    paramA(req: Request, res: Response, next: NextFunction, value: any, name: string) {
        (<any>req).A = Number(value);
        next();
    }

    @PARAM('param_b')
    paramB(req: Request, res: Response, next: NextFunction, value: any, name: string) {
        (<any>req).B = Number(value);
        next();
    }

    @GET('/:param_a/:param_b')
    getParams(req: Request, res: Response) {
        const pA = (<any>req).A;
        const pB = (<any>req).B;
        res.json({result: this.ctrlOne.sum(pA, pB)})
    }

    @POST('/post')
    create(req: Request, res: Response) {
        res.json({result: true});
    }
}

@ThController()
class MultiplyController { multiply(a: number, b: number) { return a * b; } }

@ThRouter('/')
class MultiplayRouter {

    constructor(private multiplyCtrl: MultiplyController, private sumCtrl: SumController) {}

    @GET('/')
    getRoot(req: Request, res: Response) {
        const a = this.sumCtrl.sum(2, 2);
        const b = this.sumCtrl.sum(5, 5);
        res.json({result: this.multiplyCtrl.multiply(a, b)})
    }
}

@ThModule({
    basePath: '/multiply',
    controllers: [ MultiplyController ],
    routers: [ MultiplayRouter ]
})
class MultiplyModule {}

@ThModule({
    basePath: '/math',
    controllers: [ SumController ],
    routers: [ SumRouter ],
    imports: [ MultiplyModule ]
})
class MathModule {}


describe("ThRouter", () => {

    const mainModuleResolver = MainApplication.bootstrap(MathModule);
    const expressController  = <ExpressController>mainModuleResolver.getInjectorTree().get(ExpressController);
    const expressApp         = expressController.getApp();

    it("should be created /math/sum/ router", async () => {
        const {result} = (await supertest(expressApp).get('/math/sum')).body;
        expect(result).not.toBeUndefined();
        expect(result).toBe(2);
    });

    it("should be create /math/sum/:param_a/:param_b router ", async () => {
        const {result} = (await supertest(expressApp).get('/math/sum/1/2')).body;
        expect(result).not.toBeUndefined();
        expect(result).toBe(3);
    });

    it("should be create /math/multiply router", async () => {
        const {result} = (await supertest(expressApp).get('/math/multiply')).body;
        expect(result).not.toBeUndefined();
        expect(result).toBe(40);
    });

    it("should be create /math/sum/post with POST http method.", async () => {
        const {result} = (await supertest(expressApp).get('/math/sum/post')).body;
        expect(result).not.toBeTruthy();
    });

});