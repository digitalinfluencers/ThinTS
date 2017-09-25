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
    _dependencies: any;
    _cache: Map<any, any>;
    constructor(module: ModuleResolver);
    get<T = any>(token: any): any;
    getParentBranch(): InjectorBranch_ | null;
    pushAndResolve<T = any>(cls: any): T;
    pushResolved(cls: any, instance: any): void;
    initDependency(cls: any): any;
    isDeclared(cls: any): any;
    _throwInvalid(cls: any): void;
}
