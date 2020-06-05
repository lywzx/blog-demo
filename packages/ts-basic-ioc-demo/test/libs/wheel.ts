import { Injectable } from '../../src/decorator/injectable';
import { Shoe } from './shoe';
import { Rim } from './rim';

@Injectable
export class Wheel {
  constructor(public shoe: Shoe, public rim: Rim) {}
}
