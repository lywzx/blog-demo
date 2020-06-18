import {B} from "./b";
import {Injectable} from "../../../src/decorator";

@Injectable
export class A {
    constructor(protected b: B) {
    }
}
