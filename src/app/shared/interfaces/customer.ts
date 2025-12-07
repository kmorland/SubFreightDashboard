import { IAddress } from "./quote-form-type";

export interface ICustomer{
    customerId: number,
    businessName: string,
    contactName: string,
    emailAddress: string,
    phone: string,
    address: IAddress,
}