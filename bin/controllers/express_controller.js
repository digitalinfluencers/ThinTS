"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
const express = require("express");
const core_1 = require("../core");
const nodeHttp = require("http");
const nodeHttps = require("https");
const fs = require("fs");
const util_1 = require("../util");
const log_controller_1 = require("./log.controller");
/**
 * Responsible to manage Express App instance.
 */
let ExpressController = class ExpressController {
    constructor(logCtrl) {
        this.logCtrl = logCtrl;
        this._app = express();
    }
    getApp() {
        return this._app;
    }
    getHttpServer() {
        return this._http_server;
    }
    getHttpsServer() {
        return this._https_server;
    }
    setConfig(config) {
        this._config = config || {};
        if (util_1.objectPath(this._config, 'http.autostart', true)) {
            this.startHttp();
        }
        if (util_1.objectPath(this._config, 'https.autostart', false)) {
            this.startHttps();
        }
    }
    startHttp() {
        this._http_server = nodeHttp.createServer(this.getApp());
        const port = util_1.objectPath(this._config, 'http.port', 80);
        const host = util_1.objectPath(this._config, 'http.host', "localhost");
        return new Promise((resolve, reject) => {
            this.logCtrl.log(`HTTP Server started at ${host}:${port}`);
            this._http_server.listen(port, host, (error) => error ? reject(error) : resolve());
        });
    }
    startHttps() {
        const port = util_1.objectPath(this._config, 'https.port', 443);
        const host = util_1.objectPath(this._config, 'https.host', "localhost");
        const credentials = util_1.objectPath(this._config, 'https.credentials');
        const key = fs.readFileSync(credentials.keyUrl, 'utf8');
        const cert = fs.readFileSync(credentials.certificateUrl, 'utf8');
        this._https_server = nodeHttps.createServer({ key, cert }, this.getApp());
        return new Promise((resolve, reject) => {
            this.logCtrl.log(`HTTPS Server started at ${host}:${port}`);
            this._https_server.listen(port, host, (error) => error ? reject(error) : resolve());
        });
    }
};
ExpressController = __decorate([
    core_1.ThController(),
    __metadata("design:paramtypes", [log_controller_1.LogController])
], ExpressController);
exports.ExpressController = ExpressController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc19jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL2V4cHJlc3NfY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7R0FNRztBQUNILG1DQUFtQztBQUNuQyxrQ0FBcUM7QUFDckMsaUNBQWlDO0FBQ2pDLG1DQUFtQztBQUNuQyx5QkFBeUI7QUFDekIsa0NBQW1DO0FBQ25DLHFEQUErQztBQW9CL0M7O0dBRUc7QUFFSCxJQUFhLGlCQUFpQixHQUE5QjtJQU9JLFlBQW9CLE9BQXNCO1FBQXRCLFlBQU8sR0FBUCxPQUFPLENBQWU7UUFDdEMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsTUFBTTtRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxhQUFhO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUVELGNBQWM7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQStCO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUU1QixFQUFFLENBQUMsQ0FBQyxpQkFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsaUJBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdEIsQ0FBQztJQUNMLENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sSUFBSSxHQUFHLGlCQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkQsTUFBTSxJQUFJLEdBQUcsaUJBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNoRSxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTTtZQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEtBQVUsS0FBSyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sRUFBRSxDQUFDLENBQUE7UUFDM0YsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsVUFBVTtRQUNOLE1BQU0sSUFBSSxHQUFHLGlCQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDekQsTUFBTSxJQUFJLEdBQUcsaUJBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNqRSxNQUFNLFdBQVcsR0FBRyxpQkFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUVsRSxNQUFNLEdBQUcsR0FBSSxFQUFFLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDekQsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRWpFLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUMxRSxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTTtZQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEtBQVUsS0FBSyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sRUFBRSxDQUFDLENBQUE7UUFDNUYsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBRUosQ0FBQTtBQTVEWSxpQkFBaUI7SUFEN0IsbUJBQVksRUFBRTtxQ0FRa0IsOEJBQWE7R0FQakMsaUJBQWlCLENBNEQ3QjtBQTVEWSw4Q0FBaUIifQ==