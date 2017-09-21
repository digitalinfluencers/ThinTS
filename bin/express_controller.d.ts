/// <reference types="express" />
import * as express from "express";
/**
 * Responsible to manage Express App instance.
 */
export declare class ExpressController {
    private _app;
    constructor();
    getApp(): express.Application;
}
