export interface ISubmitFormOptions {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export type SubmitCallback = (options: ISubmitFormOptions) => void;
