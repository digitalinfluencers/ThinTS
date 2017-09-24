"use strict";
/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
Object.defineProperty(exports, "__esModule", { value: true });
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
class InjectorToken {
    static create(token) {
        if (globalTokenRegistry.get(token)) {
            throw new Error("A token already registered with this information.");
        }
        return globalTokenRegistry.create(token);
    }
    static get(token) {
        return globalTokenRegistry.get(token);
    }
}
exports.InjectorToken = InjectorToken;
class InjectorToken_ extends InjectorToken {
    constructor(token, id) {
        super();
        this.token = token;
        this.id = id;
    }
    getToken() {
        return this.token;
    }
    getId() {
        return this.id;
    }
}
class TokenRegistry {
    constructor() {
        this._tokens = new Map();
    }
    numberOfTokens() {
        return this._tokens.size;
    }
    create(token) {
        const instance = new InjectorToken_(token, this.numberOfTokens());
        this._tokens.set(token, instance);
        return instance;
    }
    get(token) {
        return this._tokens.get(token) || null;
    }
}
const globalTokenRegistry = new TokenRegistry();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0b3JfdG9rZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGkvaW5qZWN0b3JfdG9rZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7QUFHSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0g7SUFLSSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQVU7UUFDcEIsRUFBRSxDQUFDLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUE7UUFDeEUsQ0FBQztRQUNELE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFrQixDQUFBO0lBQzdELENBQUM7SUFFRCxNQUFNLENBQUMsR0FBRyxDQUFVLEtBQVU7UUFDMUIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUN6QyxDQUFDO0NBRUo7QUFoQkQsc0NBZ0JDO0FBR0Qsb0JBQXFCLFNBQVEsYUFBYTtJQUV0QyxZQUFvQixLQUFVLEVBQVUsRUFBVTtRQUM5QyxLQUFLLEVBQUUsQ0FBQztRQURRLFVBQUssR0FBTCxLQUFLLENBQUs7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFRO0lBRWxELENBQUM7SUFFRCxRQUFRO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUE7SUFDckIsQ0FBQztJQUVELEtBQUs7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNuQixDQUFDO0NBRUo7QUFFRDtJQUFBO1FBQ0ksWUFBTyxHQUFHLElBQUksR0FBRyxFQUF1QixDQUFDO0lBZTdDLENBQUM7SUFiRyxjQUFjO1FBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO0lBQzdCLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBVTtRQUNiLE1BQU0sUUFBUSxHQUFHLElBQUksY0FBYyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbEMsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRUQsR0FBRyxDQUFDLEtBQVU7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDO0lBQzNDLENBQUM7Q0FDSjtBQUVELE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQyJ9