import {C} from "./c";
import {Injectable} from "../../../src/decorator";

@Injectable
export class B {
    constructor(protected c: C) {
    }
}
