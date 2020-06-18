import 'reflect-metadata';
import { Constructor } from "../types";
import {InjectValueInterface} from "../interface/inject-value.interface";
import {InjectFactoryInterface} from "../interface/inject-factory.interface";
import {InjectUseClassInterface} from "../interface/inject-use-class.interface";

export const injectKey = Symbol('inject:key');

export const InjectMap: Map<string | Symbol | Object, InjectFactoryInterface<any>|InjectValueInterface<any>| InjectUseClassInterface<any>> = new Map();

export function Inject<T>(inject: string | Constructor<T> | Symbol) {
    return function (target: T, name: string, index: number) {
        const old = Reflect.getMetadata(injectKey, target, name) || [];
        Reflect.defineMetadata(injectKey, [...old, {
            use: inject,
            index,
        }], target, name);
    }
}
