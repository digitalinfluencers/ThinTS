/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
import * as express from "express";
import {ThController} from "../core";
import * as nodeHttp from "http";
import * as nodeHttps from "https";
import * as fs from "fs";
import {objectPath} from "../util";
import {LogController} from "./log.controller";


export interface ExpressControllerConfig {
    http?: {
        autostart?: boolean
        port?: number
        host?: string
    }
    https?: {
        autostart?: boolean
        port?: number,
        host?: string,
        credentials: {
            keyUrl: string,
            certificateUrl: string
        }
    }
}

/**
 * Responsible to manage Express App instance.
 */
@ThController()
export class ExpressController {

    private _app: express.Application;
    private _http_server: nodeHttp.Server;
    private _https_server: nodeHttps.Server;
    private _config: ExpressControllerConfig;

    constructor(private logCtrl: LogController) {
        this._app = express();
    }

    getApp(): express.Application {
        return this._app;
    }

    getHttpServer(): nodeHttp.Server {
        return this._http_server;
    }

    getHttpsServer(): nodeHttps.Server {
        return this._https_server;
    }

    setConfig(config: ExpressControllerConfig) {
        this._config = config || {};

        if (objectPath(this._config, 'http.autostart', true)) {
            this.startHttp();
        }

        if (objectPath(this._config, 'https.autostart', false)) {
            this.startHttps();
        }
    }

    startHttp(): Promise<any> {
        this._http_server = nodeHttp.createServer(this.getApp());
        const port = objectPath(this._config, 'http.port', 80);
        const host = objectPath(this._config, 'http.host', "localhost");
        return new Promise((resolve, reject) => {
            this.logCtrl.log(`HTTP Server started at ${host}:${port}`);
            this._http_server.listen(port, host, (error: any) => error ? reject(error) : resolve())
        });
    }

    startHttps(): Promise<any> {
        const port = objectPath(this._config, 'https.port', 443);
        const host = objectPath(this._config, 'https.host', "localhost");
        const credentials = objectPath(this._config, 'https.credentials');

        const key  = fs.readFileSync(credentials.keyUrl, 'utf8');
        const cert = fs.readFileSync(credentials.certificateUrl, 'utf8');

        this._https_server = nodeHttps.createServer({ key, cert }, this.getApp());
        return new Promise((resolve, reject) => {
            this.logCtrl.log(`HTTPS Server started at ${host}:${port}`);
            this._https_server.listen(port, host, (error: any) => error ? reject(error) : resolve())
        });
    }

}