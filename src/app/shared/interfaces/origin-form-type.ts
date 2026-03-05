import { IAddress } from "./quote-form-type";

export interface IOriginForm {
  country: 'USA/CAN' | 'MEX';
  searchTerm: string;
  address: IAddress;
  siteType: 'business' | 'residence';
  pickupDate: string;
  nonCommercialPickupSite: number;
  accessorials: {
    liftGate: boolean;
    insidePickup: boolean;
    appointment: boolean;
  };
}
