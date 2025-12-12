export interface IDestinationForm {
  country: 'USA/CAN' | 'MEX';
  address: string;
  siteType: 'Business' | 'Residence' | 'TradeShow';
  nonCommercialDeliverySite: string;
  accessorials: {
    liftGate: boolean;
    notifyPriorToArrival: boolean;
    insideDelivery: boolean;
    appointment: boolean;
    sortAndSegregate: boolean;
  };
}
