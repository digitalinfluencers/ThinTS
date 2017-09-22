/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
import {resolveDeps} from "../util";
import {ModuleResolver} from "../module_resolver";

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

    _controllersCache = new Map<any, any>();
    _controllers: any[];

    constructor(_controllers: any[], private module: ModuleResolver) {
        super();
        this._controllers = _controllers;

        for (const controller of _controllers) {
            this._initiate(controller);
        }
    }

    isDeclared(controller: any) {
        return this._controllers.some(c => c===controller);
    }

    get<T = any>(controller: any): any {
        if (controller === InjectorBranch) {
            return this;
        }
        let branch: InjectorBranch_ = this;
        while(branch instanceof InjectorBranch) {
            if (branch.isDeclared(controller)) {
                if (branch._controllersCache.has(controller)) {
                    return branch._controllersCache.get(controller);
                } else {
                    return branch._initiate(controller);
                }
            }
            branch = <InjectorBranch_>branch.getParentBranch();
        }
        return null;
    }

    getParentBranch(): InjectorBranch|null {
        const parent = this.module.getParent();
        return parent ? parent.getInjectorTree() : null;
    }

    push(cls: any) {
        this._controllers.push(cls);
        this.get(cls);
    }

    pushResolved(cls: any, instance: any) {
        this._controllers.push(cls);
        this._controllersCache.set(cls, instance);
    }

    remove(cls: any) {
        if (this._controllersCache.has(cls)) {
            this._controllersCache.delete(cls);
        }
        const index = this._controllers.indexOf(cls);
        if (index !== -1) {
            this._controllers.splice(index, 1);
        }
    }

    _initiate(controller: any) {
        if (!(controller && typeof controller === "function")) {
            this._throwInvalid(controller);
        }
        const instance = resolveDeps(controller, this);
        this._controllersCache.set(controller, instance);
        return instance;
    }

    _throwInvalid(cls: any) {
        throw new Error(
            `Invalid controller ${cls}.`
        )
    }

}