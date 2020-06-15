import promisesAplusTests from 'promises-aplus-tests';
import {MyPromise} from '../src';
import { expect } from 'chai';

const adapter = {
  resolved: MyPromise.resolve as any,
  rejected: MyPromise.reject as any,
  deferred() {
    const ret: any = {
      resolve: undefined,
      reject: undefined,
      promise: undefined,
    };
    ret.promise = new MyPromise((resolve, reject) => {
      ret.resolve = resolve;
      ret.reject = reject;
    });

    return ret;
  }
};

const standAdapter = {
  resolve: Promise.resolve,
  reject: Promise.reject,
  deferred() {
    const ret: any = {
      resolve: undefined,
      reject: undefined,
      promise: undefined,
    };
    ret.promise = new Promise((resolve, reject) => {
      ret.resolve = resolve;
      ret.reject = reject;
    });

    return ret;
  }
}

describe("Promises/A+ Tests", function () {
  promisesAplusTests.mocha(adapter);


  /*it('when `onRejected` is added immediately after the promise is rejected', function() {
    var d = adapter.deferred();
    var onRejectedCalled = false;

    d.reject({ dummy: "dummy" });

    d.promise.then(null, function onRejected() {
      onRejectedCalled = true;
    });

    expect(onRejectedCalled).to.be.eq(false);
  });*/

  /*it('applied to a promise rejected and then chained off of', function (done: any) {
    var dummy = { dummy: "dummy" };
    MyPromise.reject(dummy)
      .then(function () {})
      .then(null, function () {
        done();
      })
  })*/

  it('applied to a promise rejected and then chained off of', function (done: any) {
    var dummy = { dummy: "dummy" };
    var sentinel = { sentinel: "sentinel" }; // a sentinel fulfillment value to test for with strict equality
    var other = { other: "other" };
    MyPromise.resolve(dummy)
      .then(function (val) {
        const defer = adapter.deferred();

        setTimeout(() => {
          defer.resolve(undefined);
        }, 800);

        return defer.promise;
        /*return {
          then: function (resolvePromise: any, rejectPromise: any) {
            resolvePromise(sentinel);

            setTimeout(function () {
              rejectPromise(other);
            }, 0);
          }
        } as any;*/
      })
      .then(function (e) {
        expect(e).to.be.eq(undefined);
        done();
      })
  })
});
