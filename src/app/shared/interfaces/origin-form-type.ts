export interface IOriginForm {
  country: 'USA/CAN' | 'MEX';
  address: string;
  siteType: 'Business' | 'Residence';
  pickupDate: string;
  nonCommercialPickupSite: string;
  accessorials: {
    liftGate: boolean;
    insidePickup: boolean;
    appointment: boolean;
  };
}
