import {Injectable} from "../../../src/decorator";
import {E} from "./e";

@Injectable
export class D {
    constructor(protected e: E) {
    }
}
