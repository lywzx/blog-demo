import {Factory, InjectMap} from "../../src";
import {expect} from 'chai';
import {Car} from "../lib/cars/car";
import {Wheel} from "../lib/cars/wheel";
import {H} from "../lib/inject-circle/h";
import {CircleA, CircleB, CircleC} from '../lib/inject-optional';
import {FactoryUseValue} from "../lib/inject-value/factory-use-value";
import {CircleDependenceException, NotInjectableException} from "../../src/exception";
import {Target} from "../lib/inject-constructor/target";
import {TargetDep} from "../lib/inject-constructor/target-dep";
import {TargetDeep} from "../lib/inject-constructor/target-deep";


describe('factory test', function () {

    it('#factory single', function () {
        const car = Factory(Car);
        const wheel = Factory(Wheel);

        expect(wheel === car.wheel).to.be.equal(true);
    })

    describe('factory with inject', function () {

        it('should throw exception', function () {

            try {
                const f = Factory(FactoryUseValue);
                throw new Error();
            } catch (e) {
                expect(e.name).to.be.equal(NotInjectableException.name);
            }
        });

        it('#factory with Inject Constructor', function () {

            const value = Factory(Target);

            expect(value.b).to.be.instanceOf(TargetDep);
        });

        it('#factory with Inject Constructor dependence', function () {
            const value = Factory(TargetDeep);

            expect(value.target).to.be.instanceOf(Target);

            expect(value.target.b).to.instanceOf(TargetDep);
        });

        it('#factory with Inject useValue', function () {
            const value = {
                a: 1,
                b: 2
            };
            InjectMap.set('test-value', {
                useValue: value
            })
            const f = Factory(FactoryUseValue);

            expect(f.value).to.be.eq(value);
        });



    });


    it('#factory test circle', function () {
        InjectMap.set('H', {
            useClass: H
        });

        let err;
        try {
            const h = Factory(H);
        } catch (e) {
            err = e;
        }

        expect(err && err.name).to.be.equal(CircleDependenceException.name);
    });

    it('#factory test optional', function () {

        InjectMap.set('circle-a', {
            useClass: CircleA
        });

        const circleA = Factory(CircleA);

        expect(circleA).to.be.instanceOf(CircleA);

        expect(circleA.circleB).to.be.instanceOf(CircleB);

        expect(circleA.circleB.circleC).to.be.instanceOf(CircleC);

        expect(circleA.circleB.circleC).to.be.undefined('circleA');


    });
});
