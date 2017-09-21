/**
 * @whatItDoes ThRouter Decorator
 *
 * <pre><code>
 *  @ThRouter('/my')
 * class MyRouter {}
 *
 *  @ThModule({
 *  routers: [ MyRouter ]
 * })
 * class MyMainModule {}
 * </pre></code>
 *
 * @description
 * Used to inform that the class is as router handler.
 *
 * @stable
 */
export interface ThRouter {
    path?: string;
}
export declare const ThRouter: ThRouterDecorator;
/**
 * @internal
 * @hidden
 */
export interface ThRouterDecorator {
    (path?: string): ClassDecorator;
}
