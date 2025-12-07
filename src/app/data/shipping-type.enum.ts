export enum ShippingType {
    NewGoods,
    UsedGoods
}

export const ShippingTypeStrings: any = [
    'New commercial goods',
    'Used commercial goods',
];

export function getShippingTypeString(value: string | number) {
    return ShippingTypeStrings[value];
}
