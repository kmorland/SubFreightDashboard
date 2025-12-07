export enum LocationType {
    BusinessWithDock = 'Business with dock or focklift',
    BusinessWithoutDock = 'Business without a dock or forklift',
    Residential = 'Residential or non-commericial',
    LimitedAccess = 'Limited Access',
    TradeShow = 'Trade show or convention',
    ConstructionSite = 'Construction Site',
    DropoffTerminal = 'Dropoff at carrier terminal',
}

export const LocationTypeStrings: any = [
    'Business with dock or forklift',
    'Business without a dock or forklift',
    'Residential or non-commericial',
    'Limited Access',
    'Trade show or convention',
    'Construction Site',
    'Dropoff at carrier terminal',
];

export function getLocationTypeString(value: string | number) {
    return LocationTypeStrings[value];
}
