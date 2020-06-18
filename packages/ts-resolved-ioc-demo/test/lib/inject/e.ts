import {Injectable} from "../../../src/decorator";
import {F} from "./f";

@Injectable
export class E {
    constructor(protected f: F) {
    }
}
