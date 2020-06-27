import {Inject, Injectable, Optional} from '../../../src/decorator';

@Injectable
export class CircleC {
    constructor(@Optional @Inject('circle-a') public circleA?: CircleA) {
    }
}

@Injectable
export class CircleB {
    constructor(public circleC: CircleC) {
    }
}

@Injectable
export class CircleA {
    constructor(public circleB: CircleB) {
    }
}




