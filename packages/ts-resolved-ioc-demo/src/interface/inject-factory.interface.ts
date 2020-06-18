export interface InjectFactoryInterface<T> {
    inject?: Array<string | Symbol | ObjectConstructor>,
    factory: (...args: any[]) => T
}
