import {Injectable} from "../../../src/decorator";
import {I} from "./i";

@Injectable
export class H {
    constructor(protected i: I) {
    }
}
