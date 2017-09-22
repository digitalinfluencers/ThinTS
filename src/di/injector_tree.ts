/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import {Reflection} from "../metadata/reflection";
import {resolveDeps} from "../util";

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
    _parent: InjectorBranch|null;

    constructor(_controllers: any[], parent?: InjectorBranch) {
        super();
        this._controllers = _controllers;
        this._parent = parent || null;

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
            branch = <InjectorBranch_>branch._parent;
        }
        return null;
    }

    push(cls: any) {
        this._controllers.push(cls);
        this.get(cls);
    }

    pushResolved(cls: any, instance: any) {
        this._controllers.push(cls);
        this._controllersCache.set(cls, instance);
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