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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const express = require("express");
let ExpressController = class ExpressController {
    constructor() {
        this._app = express();
    }
    getApp() {
        return this._app;
    }
};
ExpressController = __decorate([
    index_1.ThController(),
    __metadata("design:paramtypes", [])
], ExpressController);
exports.ExpressController = ExpressController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc19jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2V4cHJlc3NfY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7OztBQUVILG1DQUFxQztBQUNyQyxtQ0FBbUM7QUFJbkMsSUFBYSxpQkFBaUIsR0FBOUI7SUFJSTtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELE1BQU07UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0NBRUosQ0FBQTtBQVpZLGlCQUFpQjtJQUQ3QixvQkFBWSxFQUFFOztHQUNGLGlCQUFpQixDQVk3QjtBQVpZLDhDQUFpQiJ9