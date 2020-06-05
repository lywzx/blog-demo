import { Injectable } from '../../src/decorator/injectable';
import { Wheel } from './wheel';

@Injectable
export class Car {
  constructor(public wheel: Wheel) {}
}
