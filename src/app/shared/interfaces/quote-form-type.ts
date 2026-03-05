import { IDestinationForm } from "./destination-form-type"
import { IOriginForm } from "./origin-form-type"

export interface IAddress {
    address: string,
    address2?: string
    city: string,
    state: string,
    postalCode: string,
    pickupDate?: Date | null, //Optional property
    pickupTime?: string, //Optional property
    dropOffDate?: Date | null, //Optional property
    dropOffTime?: string //Optional property
};

export interface IItem {
    pieceCount: number,
    palletCount: number,
    length: number,
    width: number,
    height: number,
    weight: number,
    weightType: number,
    productClass: number,
    linearFeet: number,
    nmfcNumber: string,
    description: string,
    packageType: string,
    hazmat: boolean,
    haxmatClass: number,
    stackable: boolean
};

export interface IQuoteData {
    stackable: boolean,
    terminalPickup: boolean,
    valueOfGoods: number,
    shipmentNew: boolean,
    origin: IAddress,
    destination: IAddress,
    items: IItem[],
    accessorials: number[]
};

export interface IQuoteForm {
    origin: IOriginForm,
    destination: IDestinationForm,
    items: IItem[]
}

export const INITIAL_QUOTE: IQuoteForm = {
    origin: {
      country: 'USA/CAN',
      searchTerm: '',
      address: {
        address: '',
        city: '',
        postalCode: '',
        state: ''
      },
      siteType: 'business',
      pickupDate: '',
      nonCommercialPickupSite: 0,
      accessorials: {
        liftGate: false,
        insidePickup: false,
        appointment: false,
      },
    },
    destination: {
      country: 'USA/CAN',
      searchTerm: '',
      address: {
        address: '',
        city: '',
        postalCode: '',
        state: ''
      },
      siteType: 'business',
      nonCommercialDeliverySite: 0,
      accessorials: {
        liftGate: false,
        notifyPriorToArrival: false,
        insideDelivery: false,
        appointment: false,
        sortAndSegregate: false,
      },
    },
    items: [{
      pieceCount: 0,
      palletCount: 0,
      length: 0,
      width: 0,
      height: 0,
      weight: 0,
      weightType: 0,
      productClass: 0,
      linearFeet: 0,
      nmfcNumber: '',
      description: '',
      packageType: '0',
      hazmat: false,
      haxmatClass: 0,
      stackable: false
    }]
  };
