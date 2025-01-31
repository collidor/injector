export type Type<T> = new (...args: any[]) => T;

export class Injector {
    private instances = new Map<any, any>();

    public register = <T = any, Q = any>(type: Q, instance: T) => {
        this.instances.set(type, instance);
    };

    public inject = <
        T,
        Q = T extends Type<infer M> ? M
            : T extends (...args: unknown[]) => infer R ? R
            : any,
    >(
        type: T,
    ): Q => {
        return this.instances.get(type) as Q;
    };

    public get = <
        T,
        Q = T extends Type<infer M> ? M
            : T extends (...args: unknown[]) => infer R ? R
            : any,
    >(
        type: T,
    ): Q => this.inject(type);
}
