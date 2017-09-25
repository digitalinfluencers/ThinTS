/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
import {resolveDeps, stringify} from "../util";
import {ModuleResolver} from "../module_resolver";
import {ThModuleDependency} from "../metadata/th_module";

/**
 * Responsible to manage all dependencies in modules.
 */
export abstract class InjectorBranch {
    abstract get<T>(cls: any): T|null;
    abstract get(cls: any): any|null;
    abstract isDeclared(cls: any): boolean;
}


/**
 * @internal
 * @hidden
 */
export class InjectorBranch_ extends InjectorBranch {

    _dependencies: any;
    _cache = new Map<any, any>();

    constructor(private module: ModuleResolver) {
        super();
    }

    get<T = any>(token: any): any {
        if (token === InjectorBranch) {
            return this;
        }
        let branch: InjectorBranch_ = this;
        while(branch instanceof InjectorBranch) {
            if (branch.isDeclared(token)) {
                if (branch._cache.has(token)) {
                    return branch._cache.get(token);
                } else {
                    return branch.initDependency(token);
                }
            }
            branch = <InjectorBranch_>branch.getParentBranch();
        }
        return null;
    }

    getParentBranch(): InjectorBranch_|null {
        const parent = this.module.getParent();
        return parent ? parent.getInjectorTree() as InjectorBranch_ : null;
    }

    pushAndResolve<T = any>(cls: any): T {
        if (!this.isDeclared(cls)) {
            this._dependencies.push(cls);
        }
        return this.get(cls);
    }

    pushResolved(cls: any, instance: any) {
        if (this.isDeclared(cls)) {
            return;
        }
        this._dependencies.push({token: cls, class: cls});
        this._cache.set(cls, instance);
    }

    initDependency(cls: any) {
        if (!cls || !this.isDeclared(cls)) {
            this._throwInvalid(cls);
        }
        const dependency: ThModuleDependency = this._dependencies.find(({token}: any) => token === cls);

        if (dependency.class) {
            const instance = resolveDeps(dependency.class, this);
            this._cache.set(dependency.token, instance);
            return instance;
        }
        if (dependency.value) {
            this._cache.set(dependency.token, dependency.value);
            return dependency.value;
        }
        if (dependency.factory) {
            const deps = dependency.deps || [];
            const resolvedDeps = deps.map((d: any) => this.get(d));
            const instance = dependency.factory(...resolvedDeps);
            this._cache.set(dependency.token, instance);
            return instance;
        }
        this._throwInvalid(cls);
    }

    isDeclared(cls: any) {
        return this._dependencies.some(({token}: any) => token === cls)
    }

    _throwInvalid(cls: any) {
        throw new Error(
            `Invalid ${stringify(cls)} in ${stringify(this.module.getModule())}.`
        )
    }

}