import {Target} from "./target";
import {Injectable} from "../../../src/decorator";

@Injectable
export class TargetDeep {
    constructor(public target: Target) {
    }
}
