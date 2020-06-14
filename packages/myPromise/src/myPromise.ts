export class MyPromise<T> {
  private status: MyPromiseStatus;

  private value: any;

  private reason: any;

  private fullFilledEvents: onFulFilled<any>[] = [];

  private rejectedFillEvents: onRejected<any>[] = [];

  // 是否有注册rejected的处理函数
  private isRegistryCatch: boolean = false;

  constructor(executor: Executor<T>) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    const resolved = function(value?: T | MyPromise<T>): void {
      if (self.status === MyPromiseStatus.pending) {
        if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
          try {
            if (value === self) {
              throw new TypeError('Chaining cycle detected for promise #<Promise>');
            }
            let then;
            if ( value && (then = (value as MyPromise<T>).then) && then === self.then && value instanceof MyPromise) {
              then.call(value, resolved, rejected);
              return ;
            }
          } catch (e) {
            rejected(e);
            return ;
          }
        }
        self.value = value;
        self.status = MyPromiseStatus.resolved;

        runImmediate(() => {
          let currentFullFilled;
          while (!!(currentFullFilled = self.fullFilledEvents.shift())) {
            currentFullFilled(self.value);
          }
        });
      }
    };
    const rejected = function(reason?: any): void {
      if (self.status === MyPromiseStatus.pending) {
        self.reason = reason;
        self.status = MyPromiseStatus.rejected;

        runImmediate(function () {
          let currentRejected;
          while (!!(currentRejected = self.rejectedFillEvents.shift())) {
            currentRejected(self.reason);
          }

          /*if (!self.isRegistryCatch) {
            throw reason;
          }*/
        })
      }
    };

    this.status = MyPromiseStatus.pending;

    try {
      executor(resolved, rejected);
    } catch (e) {
      rejected(e);
    }
  }

  then<TResult1 = T, TResult2 = never>(
    onFulFilled?: onFulFilled<T, TResult1>,
    onRejected?: onRejected<TResult2>
  ): MyPromise<TResult1 | TResult2> {
    const self = this;

    // 如果注册了reject方法，需要更新isRegistryCatch，让错误不要抛出
    self.isRegistryCatch = true; //typeof onRejected === 'function';

    // 返回新的Promise
    return new MyPromise<TResult1 | TResult2>(function(resolve, reject) {

      // Promise变更为resolved状态时，需要调用的逻辑
      const newResolvedFn = function (value: any): void {
        let result;
        try {
          result = typeof onFulFilled === 'function' ? onFulFilled(value) : value;
        } catch (e) {
          reject(e);
          return ;
        }
        resolve(result);
      };

      // Promise更为rejected状态时，需要调用的逻辑
      const newRejectedFn = function (reason: any): void {
        if (typeof onRejected === 'function') {
          try {
            const result = onRejected(reason);
            resolve(result)
          } catch (e) {
            reject(e);
          }
        } else {
          reject(reason);
        }
      };

      switch (self.status) {
        case MyPromiseStatus.pending: {
          // 处理Pending状态时，先把回调注册至原始Promise的event回调中
          self.fullFilledEvents.push(newResolvedFn);
          self.rejectedFillEvents.push(newRejectedFn);
          break;
        }
        case MyPromiseStatus.rejected: {
          // 异步执行rejected回调
          setImmediate(function() {
            newRejectedFn(self.reason);
          });
          break;
        }
        case MyPromiseStatus.resolved: {
          // 异步执行resolved回调
          setImmediate(function() {
            newResolvedFn(self.value);
          });
          break;
        }
      }
    });
  }

  catch<TResult = never>(onRejected?: onRejected<TResult>): MyPromise<T | TResult> {
    return this.then(undefined, onRejected);
  }

  static resolve<T>(value?: T): MyPromise<T> {
    return new MyPromise<T>(resolve => resolve(value));
  }

  static reject(reason?: any): MyPromise<never> {
    return new MyPromise<never>((resolve, rejected) => rejected(reason));
  }
}

function runImmediate(fn: () => void, ...args: any[]) {
  setTimeout(fn, 0, ...args);
}

function isPromiseLike(value: any): boolean {
  return value && typeof value.then === 'function';
}

interface Executor<T> {
  (resolve: (value?: T | MyPromise<T>) => void, reject: (reason?: any) => void): void;
}

type onFulFilled<T, TResult = T> = ((value: T) => TResult | MyPromise<TResult>) | undefined | null;

type onRejected<TResult> = ((reason: any) => TResult | MyPromise<TResult>) | undefined | null;

enum MyPromiseStatus {
  pending = 'pending',
  resolved = 'resolved',
  rejected = 'rejected',
}
