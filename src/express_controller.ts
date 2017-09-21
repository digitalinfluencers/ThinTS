/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import {ThController} from "./index";
import * as express from "express";


@ThController()
export class ExpressController {

    private _app: express.Application;

    constructor() {
        this._app = express();
    }

    getApp(): express.Application {
        return this._app;
    }

}