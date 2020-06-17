import { Wheel } from './wheel';
import {Injectable} from "../../../src/decorator";

@Injectable
export class Car {
  constructor(public wheel: Wheel) {}
}
