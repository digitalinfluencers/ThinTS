/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */


/**
 * Enables inject in injector tree predefined values.
 *
 * ## Exemple
 *
 * <pre><code>
 *
 *  const MY_TOKEN = InjectorToken.create('MY_TOKEN')
 *
 *  @ThModule({
 *  controllers: [
 *    {token: MY_TOKEN, value: 'some value'}
 *  ]
 * })
 * class MyModule {
 *  constructor(injectorBranch: InjectorBranch) {
 *    console.log(injectorBranch.get(MY_TOKEN)); // 'some value'
 *  }
 * }
 *
 * </pre></code>
 */
export abstract class InjectorToken {

    abstract getToken(): any;
    abstract getId(): any;

    static create(token: any) {
        if (globalTokenRegistry.get(token)) {
            throw new Error("A token already registered with this information.")
        }
        return globalTokenRegistry.create(token) as InjectorToken
    }

    static get<T = any>(token: any): InjectorToken|null {
        return globalTokenRegistry.get(token)
    }

}


class InjectorToken_ extends InjectorToken {

    constructor(private token: any, private id: number) {
        super();
    }

    getToken() {
        return this.token
    }

    getId() {
        return this.id;
    }

}

class TokenRegistry {
    _tokens = new Map<any, InjectorToken_>();

    numberOfTokens(): number {
        return this._tokens.size;
    }

    create(token: any) {
        const instance = new InjectorToken_(token, this.numberOfTokens());
        this._tokens.set(token, instance);
        return instance;
    }

    get(token: any) {
        return this._tokens.get(token) || null;
    }
}

const globalTokenRegistry = new TokenRegistry();