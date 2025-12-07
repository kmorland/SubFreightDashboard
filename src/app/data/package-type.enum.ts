export enum PackageType {
    Pallets48x40,
    Pallets48x48,
    Pallets60x40,
    PalletsCustom,
}

export const PackageTypeStrings: any = [
    'Pallets (48" x 40")',
    'Pallets (48" x 48")',
    'Pallets (60" x 40")',
    'Pallets (enter dimensions)',
];

export function getPackageTypeString(value: string | number) {
    return PackageTypeStrings[value];
}
