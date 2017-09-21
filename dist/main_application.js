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
let MainApplication = MainApplication_1 = class MainApplication {
    constructor(expressController, injectorBranch) { }
    static bootstrap(apiModule) {
        const mainResolved = index_1.ModuleResolver.create(MainApplication_1);
        const apiResolved = index_1.ModuleResolver.create(apiModule, mainResolved);
        return mainResolved;
    }
};
MainApplication = MainApplication_1 = __decorate([
    index_1.ThModule({
        controllers: [
            index_1.ExpressController
        ]
    }),
    __metadata("design:paramtypes", [index_1.ExpressController, index_1.InjectorBranch])
], MainApplication);
exports.MainApplication = MainApplication;
var MainApplication_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbl9hcHBsaWNhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluX2FwcGxpY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7O0FBRUgsbUNBQXNGO0FBUXRGLElBQWEsZUFBZSx1QkFBNUI7SUFFSSxZQUFZLGlCQUFvQyxFQUFFLGNBQThCLElBQUcsQ0FBQztJQUVwRixNQUFNLENBQUMsU0FBUyxDQUFDLFNBQWM7UUFDM0IsTUFBTSxZQUFZLEdBQUcsc0JBQWMsQ0FBQyxNQUFNLENBQUMsaUJBQWUsQ0FBQyxDQUFDO1FBQzVELE1BQU0sV0FBVyxHQUFJLHNCQUFjLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNwRSxNQUFNLENBQUMsWUFBWSxDQUFDO0lBQ3hCLENBQUM7Q0FFSixDQUFBO0FBVlksZUFBZTtJQUwzQixnQkFBUSxDQUFDO1FBQ04sV0FBVyxFQUFFO1lBQ1QseUJBQWlCO1NBQ3BCO0tBQ0osQ0FBQztxQ0FHaUMseUJBQWlCLEVBQWtCLHNCQUFjO0dBRnZFLGVBQWUsQ0FVM0I7QUFWWSwwQ0FBZSJ9