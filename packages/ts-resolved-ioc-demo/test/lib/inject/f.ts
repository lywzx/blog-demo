import {Inject, Injectable} from "../../../src/decorator";
import {D} from "./d";

@Injectable
export class F {
    constructor(@Inject('D') protected d: D) {
    }
}
