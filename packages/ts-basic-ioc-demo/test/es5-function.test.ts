import { ioc } from '../src/es5-function';
import { expect } from 'chai';

describe('test es5 function reflect', function() {
  function Car(circle: any) {}

  // @ts-ignore
  const iocInstance = new ioc();

  it('#controller args should be array', function() {
    iocInstance.controller(Car);

    expect((Car as any).$inject).to.be.eql(['circle']);
  });
});
