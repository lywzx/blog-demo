import {Inject, Injectable} from "../../../src/decorator";
import {TargetDep} from "./target-dep";

@Injectable
export class Target {
    constructor(@Inject(TargetDep) public b: TargetDep) {
    }
}
