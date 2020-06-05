import 'reflect-metadata';
import { Constructor } from '../types';

export const INJECTABLE = Symbol('INJECTABLE');

export function Injectable(target: Constructor) {
  Reflect.defineMetadata(INJECTABLE, true, target);
}
