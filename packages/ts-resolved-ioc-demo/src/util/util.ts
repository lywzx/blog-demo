import {Constructor} from "../types";
import {injectKey, InjectMap} from "../decorator";
import { keyBy } from 'lodash';
import {InjectFactoryInterface} from "../interface/inject-factory.interface";
import {NotInjectableException} from "../exception";
import {FactoryFunctionInjectInterface} from "./factory";

export function getNeedInjectParams<T>(target: Constructor<T> | InjectFactoryInterface<T>): Array<ObjectConstructor | FactoryFunctionInjectInterface<T>> {
    if ('factory' in target) {
        if (target.inject) {
            return target.inject.map((item) => {
               if (typeof item === 'string' || typeof item === 'symbol') {
                   return getValueFromMappingWithException(item);
               }
               return item as ObjectConstructor;
            });
        } else {
            return [];
        }
    }

    const inject = Reflect.getMetadata('design:paramtypes', target);
    if (!inject.length) {
        return [];
    }
    const paramInject = keyBy(Reflect.getMetadata(injectKey, target) || [], 'index');

    return inject.map((value: any, index: number) => {
        if (paramInject && paramInject[index]) {

            // 可能直接传入了构造函数
            const use = paramInject[index].use;

            if (typeof use === 'function') {
                return use;
            }

            const injectMapping = InjectMap.get(use);
            if (injectMapping) {
                return {
                    __inject: true,
                    use: injectMapping
                }
            } else {
                throw new NotInjectableException(paramInject[index].use);
            }
        }
        return value;
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
