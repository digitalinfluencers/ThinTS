"use strict";
/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var MainApplication = /** @class */ (function () {
    function MainApplication(expressController, injectorBranch) {
    }
    MainApplication_1 = MainApplication;
    MainApplication.bootstrap = function (apiModule) {
        var mainResolved = index_1.ModuleResolver.create(MainApplication_1);
        var apiResolved = index_1.ModuleResolver.create(apiModule, mainResolved);
        return mainResolved;
    };
    MainApplication = MainApplication_1 = __decorate([
        index_1.ThModule({
            controllers: [
                index_1.ExpressController
            ]
        })
    ], MainApplication);
    return MainApplication;
    var MainApplication_1;
}());
exports.MainApplication = MainApplication;
