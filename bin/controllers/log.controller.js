"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
const th_controller_1 = require("../metadata/th_controller");
let LogController = class LogController {
    constructor() {
        this.service = console;
    }
    formatMsg(type, ...args) {
        const m = [
            `${new Date().toLocaleString()} - `,
            `(ThinTS ${type.toUpperCase()}): `,
            ...args
        ];
        return m.map(m => typeof m === "string" ? m : JSON.stringify(m)).join(" ");
    }
    log(...args) {
        const msg = this.formatMsg('log', ...args);
        this.service.log(msg);
    }
    info(...args) {
        const msg = this.formatMsg('info', ...args);
        this.service.info(msg);
    }
    error(...args) {
        const msg = this.formatMsg('error', ...args);
        this.service.error(msg);
    }
};
LogController = __decorate([
    th_controller_1.ThController()
], LogController);
exports.LogController = LogController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlcnMvbG9nLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7O0dBTUc7QUFDSCw2REFBdUQ7QUFHdkQsSUFBYSxhQUFhLEdBQTFCO0lBREE7UUFHWSxZQUFPLEdBQUcsT0FBTyxDQUFDO0lBMEI5QixDQUFDO0lBeEJXLFNBQVMsQ0FBQyxJQUEwQixFQUFFLEdBQUcsSUFBVztRQUN4RCxNQUFNLENBQUMsR0FBRztZQUNOLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxjQUFjLEVBQUUsS0FBSztZQUNuQyxXQUFXLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSztZQUNsQyxHQUFHLElBQUk7U0FDVixDQUFDO1FBQ0YsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUM5RSxDQUFDO0lBRUQsR0FBRyxDQUFDLEdBQUcsSUFBVztRQUNkLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUksQ0FBQyxHQUFHLElBQVc7UUFDZixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxLQUFLLENBQUMsR0FBRyxJQUFXO1FBQ2hCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUVKLENBQUE7QUE1QlksYUFBYTtJQUR6Qiw0QkFBWSxFQUFFO0dBQ0YsYUFBYSxDQTRCekI7QUE1Qlksc0NBQWEifQ==