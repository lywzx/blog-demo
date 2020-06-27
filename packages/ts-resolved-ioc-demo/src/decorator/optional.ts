import 'reflect-metadata';

export const optional = Symbol('optional');

export function Optional<T>(target: ObjectConstructor, name: string, index: number) {
    let old = Reflect.getMetadata(optional, target, name) || [];
    Reflect.defineMetadata(optional, [...old, index], target, name);
}
