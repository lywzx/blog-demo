import {A} from "./a";
import {Injectable} from "../../../src/decorator";

@Injectable
export class C {
    constructor(protected A: A) {
    }
}
