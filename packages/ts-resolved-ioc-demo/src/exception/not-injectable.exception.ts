export class NotInjectableException extends Error {
  constructor(className: string, targetClassName?: string) {
    super(`${className} can not be inject${targetClassName ? ' to: ' + targetClassName : ''}.`);
    this.name = NotInjectableException.name;
    if (Error && Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
