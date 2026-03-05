import { IAddress } from "./quote-form-type";

export interface IDestinationForm {
  country: 'USA/CAN' | 'MEX';
  searchTerm: string,
  address: IAddress;
  siteType: 'business' | 'residence' | 'tradeshow';
  nonCommercialDeliverySite: number;
  accessorials: {
    liftGate: boolean;
    notifyPriorToArrival: boolean;
    insideDelivery: boolean;
    appointment: boolean;
    sortAndSegregate: boolean;
  };
}
