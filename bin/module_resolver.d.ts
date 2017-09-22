/// <reference types="express" />
/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
import { ThModule } from "./metadata";
import { InjectorBranch } from "./di/injector_tree";
import { RequestHandler, Router } from "express";
import { ThMiddlewareImplements } from "./metadata/th_middleware";
/**
 * Responsible to compile and manage all modules.
 */
export declare abstract class ModuleResolver {
    abstract getInjectorTree(): InjectorBranch;
    abstract getParent(): ModuleResolver | null;
    abstract getRouter(): Router;
    abstract getChildren(cls: any): ModuleResolver | null;
    abstract getChildren<T>(cls: T): T;
    abstract getModuleInstance(): any;
    static create(module: any, parent?: ModuleResolver): ModuleResolver;
}
/**
 * @internal
 * @hidden
 */
export declare class ModuleMetadata {
    _controllers: any[] | null;
    _models: any[] | null;
    _basePath: string | null;
    _middlewares: [ThMiddlewareImplements | RequestHandler] | null;
    _imports: any[] | null;
    _routers: any[] | null;
    _exports: any[] | null;
    constructor({controllers, basePath, middlewares, imports, routers, models, exports}: ThModule);
}
