import {Constructor} from "../types";
import {injectKey, InjectMap, optional} from "../decorator";
import { keyBy } from 'lodash';
import {InjectFactoryInterface} from "../interface/inject-factory.interface";
import {NotInjectableException} from "../exception";
import {FactoryFunctionInjectInterface} from "./factory";


export interface InjectParamInterface<T> {
    value: ObjectConstructor | FactoryFunctionInjectInterface<T>;
    optional: boolean;
}

export interface InjectParam {
    use: any;
    index: number;
}

export function getNeedInjectParams<T>(target: Constructor<T> | InjectFactoryInterface<T>): Array<InjectParamInterface<T>> {
    if ('factory' in target) {
        if (target.inject) {
            return target.inject.map((item) => {
               if (typeof item === 'string' || typeof item === 'symbol') {
                   return {
                       optional: false,
                       value: getValueFromMappingWithException(item)
                   };
               }
               return {
                   optional: false,
                   value: item as ObjectConstructor
               };
            });
        } else {
            return [];
        }
    }

    const inject = Reflect.getMetadata('design:paramtypes', target) || [];
    if (!inject.length) {
        return [];
    }
    const paramInject: InjectParam[] = Reflect.getMetadata(injectKey, target) || [];
    const paramOption: number[] = Reflect.getMetadata(optional, target) || [];

    const paramInjectKeyBy = keyBy(paramInject, 'index');

    return inject.map((value: any, index: number) => {
        let result = value;
        if (paramInjectKeyBy && paramInjectKeyBy[index]) {

            // 可能直接传入了构造函数
            const use = paramInjectKeyBy[index].use;

            if (typeof use === 'function') {
                result = use;
            }

            const injectMapping = InjectMap.get(use);
            if (injectMapping) {
                result = {
                    __inject: true,
                    use: injectMapping
                }
            } else {
                throw new NotInjectableException(paramInjectKeyBy[index].use);
            }
        }
        return {
            value: result,
            optional: paramOption.includes(index),
        }
    });
}


function getValueFromMappingWithException(key: string | symbol ): FactoryFunctionInjectInterface<any> {
    const injectMapping = InjectMap.get(key);
    if (injectMapping) {
        return {
            __inject: true,
            use: injectMapping,
        }
    } else {
        throw new NotInjectableException(key.toString());
    }
}

export function getRealTarget<T>(target: Constructor<T> | FactoryFunctionInjectInterface<T>): InjectFactoryInterface<T> | Constructor<T> | void {
    if ((target as FactoryFunctionInjectInterface<T>).__inject) {
        const use = (target as FactoryFunctionInjectInterface<T>).use;

        if ( 'useValue' in use) {
            return undefined;
        }

        if ('factory' in use) {
            return use as InjectFactoryInterface<T>;
        }

        if ('useClass' in use) {
            return use.useClass;
        }
    }
    return target as Constructor<T>;
}


export function getTargetName<T>(target: Constructor<T> | InjectFactoryInterface<T>) {
    if ((target as Constructor<T>).name) {
        return (target as Constructor<T>).name;
    }
    return 'unknown';
}
