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
const express_controller_1 = require("./express_controller");
const injector_tree_1 = require("./di/injector_tree");
const module_resolver_1 = require("./module_resolver");
const th_module_1 = require("./metadata/th_module");
/**
 * ThinTS start point, use MainApplication.bootstrap to resolve your app module.
 */
let MainApplication = MainApplication_1 = class MainApplication {
    constructor(expressController, injectorBranch) { }
    static bootstrap(apiModule) {
        const mainResolved = module_resolver_1.ModuleResolver.create(MainApplication_1);
        const apiResolved = module_resolver_1.ModuleResolver.create(apiModule, mainResolved);
        mainResolved.childrens.push(apiResolved);
        return mainResolved;
    }
};
MainApplication = MainApplication_1 = __decorate([
    th_module_1.ThModule({
        controllers: [
            express_controller_1.ExpressController
        ]
    }),
    __metadata("design:paramtypes", [express_controller_1.ExpressController, injector_tree_1.InjectorBranch])
], MainApplication);
exports.MainApplication = MainApplication;
var MainApplication_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbl9hcHBsaWNhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluX2FwcGxpY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsNkRBQXVEO0FBQ3ZELHNEQUFrRDtBQUNsRCx1REFBaUQ7QUFDakQsb0RBQThDO0FBRTlDOztHQUVHO0FBTUgsSUFBYSxlQUFlLHVCQUE1QjtJQUVJLFlBQVksaUJBQW9DLEVBQUUsY0FBOEIsSUFBRyxDQUFDO0lBRXBGLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBYztRQUMzQixNQUFNLFlBQVksR0FBRyxnQ0FBYyxDQUFDLE1BQU0sQ0FBQyxpQkFBZSxDQUFDLENBQUM7UUFDNUQsTUFBTSxXQUFXLEdBQUksZ0NBQWMsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzlELFlBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxZQUFZLENBQUM7SUFDeEIsQ0FBQztDQUVKLENBQUE7QUFYWSxlQUFlO0lBTDNCLG9CQUFRLENBQUM7UUFDTixXQUFXLEVBQUU7WUFDVCxzQ0FBaUI7U0FDcEI7S0FDSixDQUFDO3FDQUdpQyxzQ0FBaUIsRUFBa0IsOEJBQWM7R0FGdkUsZUFBZSxDQVczQjtBQVhZLDBDQUFlIn0=