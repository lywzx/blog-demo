export class CircleDependenceException extends Error {
    constructor(className: string, targetClassName?: string) {
        super(`${className} can not be inject${targetClassName ? ' to: ' + targetClassName : ''}.`);
        this.name = CircleDependenceException.name;
        if (Error && Error.captureStackTrace) {
            Error.captureStackTrace(this, CircleDependenceException);
        }
    }
}
