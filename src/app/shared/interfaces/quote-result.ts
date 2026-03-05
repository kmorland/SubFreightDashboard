export interface ICarrierBadge {
  type: 'hazmat' | 'temperature' | 'warning';
  tooltip?: string;
}

export interface IGuaranteedService {
  available: boolean;
  date?: string;
  time?: string;
  cost?: number;
}

export interface IInsuranceOption {
  withInsurance: number;
  withoutInsurance: number;
}

export interface IQuoteResult {
  id: string;
  carrierName: string;
  carrierLogo: string;
  isFavorite: boolean;
  badges: ICarrierBadge[];
  guaranteedService: IGuaranteedService;
  carrierMaxLiability: boolean;
  dbe: boolean;
  declaredValue: number;
  deliveryType: 'Direct Point' | 'Hub' | 'Interline';
  estimatedDeliveryDate: string;
  transitDays: number;
  pricing: IInsuranceOption;
  restrictions: string[];
}

export interface IQuoteSummary {
  origin: string;
  destination: string;
  miles: number;
  freightClass: number;
  weight: number;
  pickupOptions: IPickupDeliveryOptions;
  deliveryOptions: IPickupDeliveryOptions;
}

export interface IPickupDeliveryOptions {
  siteType: 'business' | 'residence' | 'tradeshow' | 'terminal';
  accessorials: string[];
  nonCommercialSite?: string;
}

export type SortOption = 'lowestCost' | 'dbe' | 'quickestDelivery' | 'favorites';
