export type Type<T> = new (...args: any[]) => T;

export class Injector {
  private instances = new Map<any, any>();
  public parentInjector?: Injector;

  constructor(parentInjector?: Injector) {
    this.parentInjector = parentInjector;
  }

  public register = <T = any, Q = any>(type: Q, instance: T): void => {
    this.instances.set(type, instance);
  };

  public inject = <
    T,
    Q = T extends Type<infer M> ? M
      : T extends (...args: any[]) => infer R ? R
      : any,
  >(
    type: T,
  ): Q => {
    if (!this.instances.has(type)) {
      if (this.parentInjector) {
        return this.parentInjector.inject(type);
      }
      throw new Error(`No instance registered for class ${type}`);
    }
    return this.instances.get(type);
  };

  public unregister = <T = any>(type: T): void => {
    this.instances.delete(type);
  };

  public get = <
    T,
    Q = T extends Type<infer M> ? M
      : T extends (...args: any[]) => infer R ? R
      : any,
  >(
    type: T,
  ): Q => this.inject(type);

  public safeInject = <
    T,
    Q = T extends Type<infer M> ? M
      : T extends (...args: any[]) => infer R ? R
      : any,
  >(
    type: T,
  ): Q | null => {
    if (!this.instances.has(type)) {
      if (this.parentInjector) {
        return this.parentInjector.safeInject(type);
      }
      return null;
    }
    return this.instances.get(type);
  };

  public safeGet = <
    T,
    Q = T extends Type<infer M> ? M
      : T extends (...args: any[]) => infer R ? R
      : any,
  >(
    type: T,
  ): Q | null => this.safeInject(type);
}
