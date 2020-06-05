import { isFunction, isArray } from 'lodash';

export function ioc() {}

ioc.prototype.controller = function(provide: any) {
  // @ts-ignore
  if (isFunction(provide) && !provide.$inject) {
    const provideToString = provide.toString().replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, '');
    const argDesc = provideToString.match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m) || [];
    const $inject: any = [];
    argDesc[1].split(',').forEach(arg => {
      // @ts-ignore
      arg.replace(/^\s*(_?)(\S+?)\1\s*$/, function(all, underscore, name) {
        $inject.push(name);
      });
    });
    // @ts-ignore
    provide.$inject = $inject;
  } else if (isArray(provide)) {
    const $inject = provide.slice(0, -1);
    provide = provide.slice(-1);
    provide.$inject = $inject;
  }
  // todo
};
