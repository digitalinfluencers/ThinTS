/**
 * @external ThModel
 * @whatItDoes ThModel Decorator
 *
 * <pre><code>
 *  @ThModel()
 * class MyModel {}
 *
 *  @ThModule({
 *  models: [ MyModel ]
 * })
 * class MyMainModule {
 *  constructor(myModel: MyModel) {}
 * }
 * </pre></code>
 *
 * @description
 * Used to inform that the class is a component and may have its dependencies injected.
 *
 * @stable
 */
export interface ThModel {
    (): ThModel;
}
export declare const ThModel: ThModelDecorator;
/**
 * @internal
 * @hidden
 */
export interface ThModelDecorator {
    (): ClassDecorator;
}
