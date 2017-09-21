/**
 * @external Controller
 * @whatItDoes Controller Decorator
 *
 * <pre><code>
 *  @ThController()
 * class MyController {}
 *
 *  @ThModule({
 *  controllers: [ MyController ]
 * })
 * class MyMainModule {
 *  constructor(myController: MyController) {}
 * }
 * </pre></code>
 *
 * @description
 * Used to inform that the class is a component and may have its dependencies injected.
 *
 * @stable
 */
export interface ThController {
    (): ThController;
}
export declare const ThController: ThControllerDecorator;
/**
 * @internal
 * @hidden
 */
export interface ThControllerDecorator {
    (): ClassDecorator;
}
