import {Constructor} from "../types";

export interface InjectUseClassInterface<T> {
    useClass: Constructor<T>,
}
