import { IAddress } from "./quote-form-type";
import { ICustomer } from "./customer";

export interface ICompany {
    companyName: string;
    contactName: string;
    address: IAddress;
}

export interface IAccountProfile {
    accountId: string;
    email: string;
    company: ICompany;
    customers: ICustomer[];
}
