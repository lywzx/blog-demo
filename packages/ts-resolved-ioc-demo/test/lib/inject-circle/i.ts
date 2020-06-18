import {Injectable} from "../../../src/decorator";
import {J} from "./j";

@Injectable
export class I {
    constructor(protected j: J) {
    }
}
