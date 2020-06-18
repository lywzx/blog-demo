import {Constructor} from "../types";
import {INJECTABLE} from "../decorator/injectable";
import {NotInjectableException} from "../exception/not-injectable.exception";
import { Single } from "./single";
import {getNeedInjectParams} from "./util";
import {InjectFactoryInterface} from "../interface/inject-factory.interface";
import {InjectValueInterface} from "../interface/inject-value.interface";
import {InjectUseClassInterface} from "../interface/inject-use-class.interface";


export interface FactoryFunctionInjectInterface<T> {
    // 表示被注入的
    __inject: boolean;

    use: InjectFactoryInterface<T> | InjectValueInterface<T> | InjectUseClassInterface<T>
}
export function Factory<T>(target: Constructor<T> | FactoryFunctionInjectInterface<T>, reference?: Constructor<T> | FactoryFunctionInjectInterface<T>): T {
    let realTarget: Constructor<T> | InjectFactoryInterface<T> | undefined;

    if ((target as FactoryFunctionInjectInterface<T>).__inject) {
        const use = (target as FactoryFunctionInjectInterface<T>).use;

        if ( 'useValue' in use) {
            return use.useValue as T;
        }

        if ('factory' in use) {
            realTarget = use;
        }

        if ('useClass' in use) {
            realTarget = use.useClass;
        }
    }
    if (realTarget === undefined) {
        realTarget = target as Constructor<T>;
    }

    // single
    if (Single.get(realTarget)) {
        return Single.get(realTarget) as T;
    }

    if (!('factory' in realTarget) && !Reflect.getMetadata(INJECTABLE, realTarget)) {
        let referenceMessage = undefined;
        if (reference) {
            if ('__inject' in target) {
                referenceMessage = 'variable';
            } else if ('name' in reference) {
                referenceMessage = reference.name;
            }
        }
        throw new NotInjectableException(realTarget.name, referenceMessage);
    }

    // 获取target类的构造函数参数providers
    const providers = getNeedInjectParams(realTarget);

    if (!providers.length) {
        let targetResult;
        if ('factory' in realTarget) {
            targetResult = realTarget.factory();
        } else {
            targetResult = Reflect.construct(realTarget, []);
        }
        Single.set(target, targetResult)
        return targetResult;
    }

    // 将参数依次实例化
    const args = providers.map((provider) => {
        return Factory(provider, target);
    });

    // 将实例化的数组作为target类的参数，并返回target的实例
    let targetResult;
    if ('factory' in realTarget) {
        targetResult = realTarget.factory(...args);
    } else {
        targetResult = Reflect.construct(realTarget, args);
    }
    Single.set(target, targetResult)
    return targetResult;
}
