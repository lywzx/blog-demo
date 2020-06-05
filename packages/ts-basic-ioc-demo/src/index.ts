import 'reflect-metadata';
import { INJECTABLE } from './decorator/injectable';
import { NotInjectableException } from './exception/not-injectable.exception';
import { Constructor } from './types';

export function Factory<T>(target: Constructor<T>): T {
  if (!Reflect.getMetadata(INJECTABLE, target)) {
    throw new NotInjectableException(target.name);
  }

  // 获取target类的构造函数参数providers
  const providers = Reflect.getMetadata('design:paramtypes', target);

  if (!(providers && providers.length)) {
    return Reflect.construct(target, []);
  }

  // 将参数依次实例化
  const args = providers.map((provider: Constructor) => {
    if (!Reflect.getMetadata(INJECTABLE, provider)) {
      throw new NotInjectableException(provider.name, target.name);
    }
    return Factory(provider);
  });

  // 将实例化的数组作为target类的参数，并返回target的实例
  return Reflect.construct(target, args);
}
