"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
require("reflect-metadata");
/**
 * @namespace ThinTS
 * @description
 * Entry point from which you should import all public core APIs.
 */
var metadata_1 = require("./metadata");
exports.ThRouter = metadata_1.ThRouter;
exports.ThModule = metadata_1.ThModule;
exports.ThController = metadata_1.ThController;
exports.ThModel = metadata_1.ThModel;
exports.GET = metadata_1.GET;
exports.POST = metadata_1.POST;
exports.PUT = metadata_1.PUT;
exports.PATCH = metadata_1.PATCH;
exports.DELETE = metadata_1.DELETE;
exports.PARAM = metadata_1.PARAM;
var main_application_1 = require("./main_application");
exports.MainApplication = main_application_1.MainApplication;
var express_controller_1 = require("./express_controller");
exports.ExpressController = express_controller_1.ExpressController;
var injector_tree_1 = require("./di/injector_tree");
exports.InjectorBranch = injector_tree_1.InjectorBranch;
var module_resolver_1 = require("./module_resolver");
exports.ModuleResolver = module_resolver_1.ModuleResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCw0QkFBMEI7QUFDMUI7Ozs7R0FJRztBQUNILHVDQUEyRztBQUFuRyw4QkFBQSxRQUFRLENBQUE7QUFBRSw4QkFBQSxRQUFRLENBQUE7QUFBRSxrQ0FBQSxZQUFZLENBQUE7QUFBRSw2QkFBQSxPQUFPLENBQUE7QUFBRSx5QkFBQSxHQUFHLENBQUE7QUFBRSwwQkFBQSxJQUFJLENBQUE7QUFBRSx5QkFBQSxHQUFHLENBQUE7QUFBRSwyQkFBQSxLQUFLLENBQUE7QUFBRSw0QkFBQSxNQUFNLENBQUE7QUFBRSwyQkFBQSxLQUFLLENBQUE7QUFDdkYsdURBQW1EO0FBQTNDLDZDQUFBLGVBQWUsQ0FBQTtBQUN2QiwyREFBdUQ7QUFBL0MsaURBQUEsaUJBQWlCLENBQUE7QUFDekIsb0RBQWtEO0FBQTFDLHlDQUFBLGNBQWMsQ0FBQTtBQUN0QixxREFBaUQ7QUFBekMsMkNBQUEsY0FBYyxDQUFBIn0=