import { ModuleResolver } from "../module_resolver";
/**
 * Responsible to manage all dependencies in modules.
 */
export declare abstract class InjectorBranch {
    abstract get<T>(cls: any): T | null;
    abstract get(cls: any): any | null;
    abstract isDeclared(cls: any): boolean;
}
/**
 * @internal
 * @hidden
 */
export declare class InjectorBranch_ extends InjectorBranch {
    private module;
    _controllersCache: Map<any, any>;
    _controllers: any[];
    constructor(module: ModuleResolver);
    isDeclared(controller: any): boolean;
    get<T = any>(controller: any): any;
    getParentBranch(): InjectorBranch_ | null;
    pushAndResolve<T = any>(cls: any): T;
    pushResolved(cls: any, instance: any): void;
    remove(cls: any): void;
    _initiate(controller: any): any;
    _throwInvalid(cls: any): void;
}
