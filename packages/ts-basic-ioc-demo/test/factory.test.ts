import { expect } from 'chai';
import { Rim } from './libs/rim';
import { Factory } from '../src';
import { Wheel } from './libs/wheel';
import { Shoe } from './libs/shoe';
import { Car } from './libs/car';

describe('ioc factory test', function() {
  it('#factory Rim', function() {
    expect(Factory(Rim)).to.be.instanceOf(Rim);
  });

  it('#factory Wheel', function() {
    const wheel = Factory<Wheel>(Wheel);

    expect(wheel).to.be.instanceOf(Wheel);

    expect(wheel.rim).to.be.instanceOf(Rim);

    expect(wheel.shoe).to.be.instanceOf(Shoe);
  });

  it('#factory Car', function() {
    const car = Factory(Car);

    expect(car).to.be.instanceOf(Car);
  });
});
