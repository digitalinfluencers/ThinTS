export declare abstract class InjectorBranch {
    abstract get<T>(cls: any): T;
    abstract get(cls: any): any;
    abstract isDeclared(cls: any): boolean;
}
/**
 * @internal
 * @hidden
 */
export declare class InjectorBranch_ extends InjectorBranch {
    _controllersCache: Map<any, any>;
    _controllers: any[];
    _parent: InjectorBranch | null;
    constructor(_controllers: any[], parent?: InjectorBranch);
    isDeclared(controller: any): boolean;
    get<T = any>(controller: any): any;
    _initiate(controller: any): any;
    _throwInvalid(cls: any): void;
    _throwNull(cls: any): void;
}
