export interface IAddress {
    address: string,
    address2: string
    city: string,
    state: string,
    postalCode: string,
    pickupDate?: Date | null, //Optional property
    pickupTime?: string, //Optional property
    dropOffDate?: Date | null, //Optional property
    dropOffTime?: string //Optional property
};

interface IItems {
    length: number
    width: number
    height: number
    weight: number
    weightType: number
    description: string
    hazmat: boolean
    haxmatClass: number
    productClass: number
    stackable: boolean
    quantity: number
};

export interface IQuoteData {
    origin: IAddress,
    destination: IAddress,
    items: IItems[],
    accessorials: number[],
    customerSearch: string,
};