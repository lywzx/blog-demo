import {Inject, Injectable} from "../../../src/decorator";
import {H} from "./h";

@Injectable
export class J {
    constructor(@Inject('H') protected h: H) {
    }
}
