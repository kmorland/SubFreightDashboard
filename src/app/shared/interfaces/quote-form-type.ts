export interface IAddress {
    address: string,
    address2: string
    city: string,
    state: string,
    postalCode: string
};

interface IItems {
    quality: number,
    weight: number,
    dimensions: {
        length: number,
        width: number,
        height: number
    }
};

export interface IQuoteData {
    origin: IAddress,
    destination: IAddress,
    pickup: Date,
    delivery: Date,
    items: IItems[]
};