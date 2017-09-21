"use strict";
/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
Object.defineProperty(exports, "__esModule", { value: true });
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
