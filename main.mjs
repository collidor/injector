/**
 * @template T
 * @typedef {new (...args: any[]) => T} Type
 */

export class Injector {
    #instances = new Map();

    /**
     * Registers an instance with the injector.
     * @template T - Instance type
     * @template Q - Constructor type
     * @param {Q} type - Constructor/identifier to register
     * @param {T} instance - Instance to store
     */
    register = (type, instance) => {
        this.#instances.set(type, instance);
    };

    /**
     * Retrieves an instance from the injector.
     * @template T - Constructor type
     * @param {T} type - Constructor/identifier to retrieve
     * @returns {T extends Type<infer M> ? M : T extends ((...args: any[]) => infer R) ? R : any} The stored instance
     * @throws {Error} If no instance is registered for the given type
     */
    inject = (type) => {
        const instance = this.#instances.get(type);
        if (!instance) {
            throw new Error(`No instance registered for ${type}`);
        }
        return this.#instances.get(type);
    };

    /**
     * Retrieves an instance from the injector.
     * @template T - Constructor type
     * @param {T} type - Constructor/identifier to retrieve
     * @returns {T extends Type<infer M> ? M : T extends ((...args: any[]) => infer R) ? R : any} The stored instance
     * @throws {Error} If no instance is registered for the given type
     */
    get = (type) => this.inject(type);
}
