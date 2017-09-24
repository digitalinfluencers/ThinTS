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
const express_controller_1 = require("./controllers/express_controller");
const injector_tree_1 = require("./di/injector_tree");
const module_resolver_1 = require("./module_resolver");
const th_module_1 = require("./metadata/th_module");
const log_controller_1 = require("./controllers/log.controller");
const injector_token_1 = require("./di/injector_token");
exports.MAIN_CHILD_MODULES = injector_token_1.InjectorToken.create('MAIN_CHILD_MODULES');
/**
 * ThinTS start point, use MainApplication.bootstrap to resolve your app module.
 */
let MainApplication = class MainApplication {
    constructor(injectorBranch) { }
    static get injectorTree() {
        return this.moduleResolver.getInjectorTree();
    }
    static getChildResolvers() {
        return this.injectorTree.get(exports.MAIN_CHILD_MODULES);
    }
    /** @deprecated */
    static bootstrap(apiModule, config) {
        console.warn("MainApplication.bootstrap are deprecated, please use bootstrap instead.");
        return bootstrap(apiModule, config);
    }
};
MainApplication = __decorate([
    th_module_1.ThModule({
        controllers: [
            log_controller_1.LogController
        ]
    }),
    __metadata("design:paramtypes", [injector_tree_1.InjectorBranch])
], MainApplication);
exports.MainApplication = MainApplication;
function bootstrap(apiModule, config = {}) {
    let mainResolved;
    if (MainApplication.moduleResolver instanceof module_resolver_1.ModuleResolver) {
        mainResolved = MainApplication.moduleResolver;
    }
    else {
        mainResolved = module_resolver_1.ModuleResolver.create(MainApplication, undefined, [
            { token: exports.MAIN_CHILD_MODULES, value: new Map() }
        ]);
        MainApplication.moduleResolver = mainResolved;
    }
    const apiResolved = module_resolver_1.ModuleResolver.create(apiModule, mainResolved, [express_controller_1.ExpressController]);
    mainResolved.childrens.push(apiResolved);
    const mainChildModules = mainResolved.getInjectorTree().get(exports.MAIN_CHILD_MODULES);
    mainChildModules.set(apiModule, apiResolved);
    const apiInjectorBranch = apiResolved.getInjectorTree();
    const expressController = apiInjectorBranch.get(express_controller_1.ExpressController);
    expressController.setConfig(config);
    return apiResolved;
}
exports.bootstrap = bootstrap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbl9hcHBsaWNhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluX2FwcGxpY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztHQU1HO0FBQ0gseUVBQTRGO0FBQzVGLHNEQUFtRTtBQUNuRSx1REFBaUQ7QUFDakQsb0RBQThDO0FBQzlDLGlFQUEyRDtBQUMzRCx3REFBa0Q7QUFLckMsUUFBQSxrQkFBa0IsR0FBSyw4QkFBYSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBRy9FOztHQUVHO0FBUUgsSUFBYSxlQUFlLEdBQTVCO0lBSUksWUFBWSxjQUE4QixJQUFHLENBQUM7SUFFOUMsTUFBTSxLQUFLLFlBQVk7UUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDakQsQ0FBQztJQUVELE1BQU0sQ0FBQyxpQkFBaUI7UUFDcEIsTUFBTSxDQUEyQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQywwQkFBa0IsQ0FBQyxDQUFBO0lBQzlFLENBQUM7SUFFRCxrQkFBa0I7SUFDbEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFjLEVBQUUsTUFBOEI7UUFDM0QsT0FBTyxDQUFDLElBQUksQ0FBQyx5RUFBeUUsQ0FBQyxDQUFDO1FBQ3hGLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Q0FFSixDQUFBO0FBcEJZLGVBQWU7SUFMM0Isb0JBQVEsQ0FBQztRQUNOLFdBQVcsRUFBRTtZQUNULDhCQUFhO1NBQ2hCO0tBQ0osQ0FBQztxQ0FLOEIsOEJBQWM7R0FKakMsZUFBZSxDQW9CM0I7QUFwQlksMENBQWU7QUFzQjVCLG1CQUEwQixTQUFjLEVBQUUsU0FBZ0MsRUFBRTtJQUN4RSxJQUFJLFlBQTRCLENBQUM7SUFDakMsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLGNBQWMsWUFBWSxnQ0FBYyxDQUFDLENBQUMsQ0FBQztRQUMzRCxZQUFZLEdBQUcsZUFBZSxDQUFDLGNBQWMsQ0FBQztJQUNsRCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixZQUFZLEdBQUcsZ0NBQWMsQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLFNBQVMsRUFBRTtZQUM3RCxFQUFDLEtBQUssRUFBRSwwQkFBa0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxHQUFHLEVBQUUsRUFBQztTQUNoRCxDQUFDLENBQUM7UUFDSCxlQUFlLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQTtJQUNqRCxDQUFDO0lBQ0QsTUFBTSxXQUFXLEdBQUksZ0NBQWMsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxDQUFDLHNDQUFpQixDQUFDLENBQUMsQ0FBQztJQUNuRixZQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUVoRCxNQUFNLGdCQUFnQixHQUE2QixZQUFZLENBQUMsZUFBZSxFQUFFLENBQUMsR0FBRyxDQUFDLDBCQUFrQixDQUFDLENBQUM7SUFDMUcsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM3QyxNQUFNLGlCQUFpQixHQUFHLFdBQVcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN4RCxNQUFNLGlCQUFpQixHQUFzQixpQkFBaUIsQ0FBQyxHQUFHLENBQUMsc0NBQWlCLENBQUMsQ0FBQztJQUN0RixpQkFBaUIsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFcEMsTUFBTSxDQUFDLFdBQVcsQ0FBQztBQUN2QixDQUFDO0FBcEJELDhCQW9CQyJ9