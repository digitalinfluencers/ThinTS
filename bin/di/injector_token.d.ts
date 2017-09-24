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
export declare abstract class InjectorToken {
    abstract getToken(): any;
    abstract getId(): any;
    static create(token: any): InjectorToken;
    static get<T = any>(token: any): InjectorToken | null;
}
