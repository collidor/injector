export type Type<T> = new (...args: any[]) => T;

export type Inject = <
  T,
  Q = T extends Type<infer M> ? M
    : T extends (...args: any[]) => infer R ? R
    : any,
>(
  type: T,
) => Q;

export type SafeInject = <
  T,
  Q = T extends Type<infer M> ? M
    : T extends (...args: any[]) => infer R ? R
    : any,
>(
  type: T,
) => Q | null;

export type Register = <T = any, Q = any>(type: Q, instance: T) => void;

export type Unregister = <T = any>(type: T) => void;

export class Injector {
  private instances: Map<any, any> = new Map();
  public parentInjector?: Injector;

  constructor(parentInjector?: Injector) {
    this.parentInjector = parentInjector;
  }

  public register: Register = (type, instance) => {
    this.instances.set(type, instance);
  };

  public inject: Inject = (
    type,
  ) => {
    if (!this.instances.has(type)) {
      if (this.parentInjector) {
        return this.parentInjector.inject(type);
      }
      throw new Error(`No instance registered for class ${type}`);
    }
    return this.instances.get(type);
  };

  public unregister: Unregister = (type) => {
    this.instances.delete(type);
  };

  public get: Inject = (
    type,
  ) => this.inject(type);

  public safeInject: SafeInject = (type) => {
    if (!this.instances.has(type)) {
      if (this.parentInjector) {
        return this.parentInjector.safeInject(type);
      }
      return null;
    }
    return this.instances.get(type);
  };

  public safeGet: SafeInject = (type) => this.safeInject(type);
}
