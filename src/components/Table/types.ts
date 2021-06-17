interface IAddress {
    streetAddress: string;
    city: string;
    state: string;
    zip: string;
}

export interface IData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: IAddress;
    description: string;
}

export interface IHeader {
    label: keyof Omit<IData, 'address' | 'description'>;
    dir: 'asc' | 'desc';
}

export interface IOnPaginationItemClickOptions {
    page: number;
    start: number;
    end: number;
}
