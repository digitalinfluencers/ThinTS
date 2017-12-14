/// <reference types="express" />
/// <reference types="node" />
/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
import * as express from "express";
import * as nodeHttp from "http";
import * as nodeHttps from "https";
import { LogController } from "./log.controller";
export interface ExpressControllerConfig {
    http?: {
        autostart?: boolean;
        port?: number;
        host?: string;
    };
    https?: {
        autostart?: boolean;
        port?: number;
        host?: string;
        credentials: {
            keyUrl: string;
            certificateUrl: string;
        };
    };
}
/**
 * Responsible to manage Express App instance.
 */
export declare class ExpressController {
    private logCtrl;
    private _app;
    private _http_server;
    private _https_server;
    private _config;
    constructor(logCtrl: LogController);
    getApp(): express.Application;
    getHttpServer(): nodeHttp.Server;
    getHttpsServer(): nodeHttps.Server;
    setConfig(config: ExpressControllerConfig): void;
    startHttp(): Promise<any>;
    startHttps(): Promise<any>;
}
