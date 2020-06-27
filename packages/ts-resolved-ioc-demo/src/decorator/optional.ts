import 'reflect-metadata';
import {findIndex} from 'lodash';

export const optional = Symbol('optional');

export function Optional<T>(target: ObjectConstructor, name: string, index: number) {
    let old = Reflect.getMetadata(optional, target, name) || [];
    const existsIndex = findIndex(old, {index});
    if (existsIndex !== -1) {
        old[existsIndex].optional = true;
    } else {
        old = [...old, {
            index,
            optional: true,
        }];
    }
    Reflect.defineMetadata(optional, [...old, {
        use: optional,
        index,
    }], target, name);
}
