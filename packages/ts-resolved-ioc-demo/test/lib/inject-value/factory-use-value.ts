import {Inject, Injectable} from "../../../src/decorator";

@Injectable
export class FactoryUseValue {
    constructor(@Inject('test-value') public value: any) {
    }
}
