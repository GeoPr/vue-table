export interface IFields {
    [key: string]: {
        validators?: [(value: string) => boolean] | [];
        value: string;
    }
}

export interface IIsValidOutput<T> {
    isValid: boolean;
    result: T;
    errors: string[],
}
