/// <reference types="express" />
/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
import * as express from "express";
/**
 * Responsible to manage Express App instance.
 */
export declare class ExpressController {
    private _app;
    constructor();
    getApp(): express.Application;
}
