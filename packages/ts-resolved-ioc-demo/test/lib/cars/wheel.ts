import { Shoe } from './shoe';
import { Rim } from './rim';
import {Injectable} from "../../../src/decorator";

@Injectable
export class Wheel {
  constructor(public shoe: Shoe, public rim: Rim) {}
}
