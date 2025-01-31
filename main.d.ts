declare global {
    type Type<T> = new (...args: any[]) => T;
}

export class Injector {
    register: <T = any, Q = any>(type: Q, instance: T) => void;
    inject: <
        T,
        Q = T extends Type<infer M> ? M
            : T extends ((...args: any[]) => infer R) ? R
            : any,
    >(type: T) => Q;
}
