/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
import {resolveDeps, stringify} from "../util";
import {ModuleResolver} from "../module_resolver";
import {InjectorToken} from "./injector_token";

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
    _controllers: any[] = [];

    constructor(private module: ModuleResolver) {
        super();
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

    getParentBranch(): InjectorBranch_|null {
        const parent = this.module.getParent();
        return parent ? parent.getInjectorTree() as InjectorBranch_ : null;
    }

    pushAndResolve<T = any>(cls: any): T {
        if (!this.isDeclared(cls)) {
            this._controllers.push(cls);
        }
        return this.get(cls);
    }

    pushResolved(cls: any, instance: any) {
        if (this.isDeclared(cls)) {
            return;
        }
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
        if (!controller) {
            this._throwInvalid(controller);
        }
        if (controller.token) {
            this._controllersCache.set(controller.token, controller.value);
            this._controllers.push(controller.token);
            return controller.value;
        }
        if (typeof controller !== "function") {
            this._throwInvalid(controller);
        }
        const instance = resolveDeps(controller, this);
        this._controllersCache.set(controller, instance);
        this._controllers.push(controller);
        return instance;
    }

    _throwInvalid(cls: any) {
        throw new Error(
            `Invalid controller ${stringify(cls)}.`
        )
    }

}