import { assert, expect } from 'chai';
import 'reflect-metadata';

describe('reflect metadata api learning', function() {
  describe('#metadata', function() {
    it('OnTargetWithoutTargetKey', () => {
      let decorator = Reflect.metadata('key', 'value');
      let target = function() {};
      decorator(target);

      let result = Reflect.getMetadata('key', target);
      assert.equal(result, 'value');
    });

    it('OnTargetWithTargetKey', () => {
      let decorator = Reflect.metadata('key', 'value');
      let target = {};
      decorator(target, 'name');

      let result = Reflect.hasOwnMetadata('key', target, 'name');
      assert.equal(result, true);
    });
  });

  describe('#getMetadata', function() {
    it('WithTargetKeyWhenDefined', () => {
      let obj = {};
      Reflect.defineMetadata('key', 'value', obj, 'name');
      let result = Reflect.getMetadata('key', obj, 'name');
      assert.equal(result, 'value');
    });
  });

  describe('#hasMetadata', function() {
    it('WithoutTargetKeyWhenDefinedOnPrototype', () => {
      let prototype = {};
      let obj = Object.create(prototype);
      Reflect.defineMetadata('key', 'value', prototype, 'name');
      let result = Reflect.hasMetadata('key', obj, 'name');
      assert.equal(result, true);
    });
  });

  describe('#hasOwnMetadata', function() {
    it('WithTargetKeyWhenDefinedOnPrototype', () => {
      let prototype = {};
      let obj = Object.create(prototype);
      Reflect.defineMetadata('key', 'value', prototype, 'name');
      let result = Reflect.hasOwnMetadata('key', obj, 'name');
      assert.equal(result, false);
    });

    it('WithTargetKeyWhenDefined', () => {
      let obj = {};
      Reflect.defineMetadata('key', 'value', obj, 'name');
      let result = Reflect.hasOwnMetadata('key', obj, 'name');
      assert.equal(result, true);
    });
  });

  describe('#getMetadata', function() {
    it('WithTargetKeyWhenDefinedOnPrototype', () => {
      let prototype = {};
      let obj = Object.create(prototype);
      Reflect.defineMetadata('key', 'value', prototype, 'name');
      let result = Reflect.getMetadata('key', obj, 'name');
      assert.equal(result, 'value');
    });
  });

  describe('#getOwnMetadata', function() {
    it('WithTargetKeyWhenDefinedOnPrototype', () => {
      let prototype = {};
      let obj = Object.create(prototype);
      Reflect.defineMetadata('key', 'value', prototype, 'name');
      let result = Reflect.getOwnMetadata('key', obj, 'name');
      assert.equal(result, undefined);
    });
  });

  describe('#deleteMetadata', function() {
    it('WhenDefinedWithoutTargetKey', () => {
      let obj = {};
      Reflect.defineMetadata('key', 'value', obj, undefined as any);
      let result = Reflect.deleteMetadata('key', obj, undefined as any);
      assert.equal(result, true);
    });
  });

  describe('get design:type', function() {
    const mp = new Map();
    const classDecorator = (target: Object) => {
      mp.set('design:class:decorator', Reflect.getMetadata('design:paramtypes', target));
    };

    const propertyDecorator = (target: Object, key: string | symbol) => {
      console.log(Reflect.getMetadata('design:type', target, key));
      console.log(Reflect.getMetadata('design:paramtypes', target, key));
      console.log(Reflect.getMetadata('design:returntype', target, key));
    };

    // paramtypes -> [String] 即构造函数接收的参数
    @classDecorator
    class Demo {
      innerValue: string;

      constructor(val: string) {
        this.innerValue = val;
      }

      /*
       * 元数据的值如下：
       * type -> String
       * paramtypes -> undefined
       * returntype -> undefined
       */
      @propertyDecorator
      demo1: string = 'demo1';

      /*
       * 元数据的值如下：
       * type -> Function
       * paramtypes -> [String]
       * returntype -> String
       */
      @propertyDecorator
      demo2(str: string): string {
        return str;
      }
    }

    it('get design:params from constructor paramtypes', function() {
      const value = Reflect.getMetadata('design:paramtypes', Demo);
      expect(value).to.be.eqls([String]);
    });

    it('prototype get design:type should be string', function() {
      const value = Reflect.getMetadata('design:type', Demo.prototype, 'demo1');
      expect(value).to.be.equal(String);
    });

    it('prototype get design:type should be Function', function() {
      const value = Reflect.getMetadata('design:type', Demo.prototype, 'demo2');
      expect(value).to.be.equal(Function);
    });

    it('prototype get design:paramtypes should be string', function() {
      const value = Reflect.getMetadata('design:paramtypes', Demo.prototype, 'demo2');
      expect(value).to.be.eqls([String]);
    });

    it('prototype get design:returntype should be string', function() {
      const value = Reflect.getMetadata('design:returntype', Demo.prototype, 'demo2');
      expect(value).to.be.equal(String);
    });
  });
});
