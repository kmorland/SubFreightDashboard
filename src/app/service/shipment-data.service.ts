import { Injectable } from '@angular/core';

export interface IDescriptionShipmentItem {
    description: string, 
    nmfc: string, 
    productClass: number
};

export enum ShipmentUnitType {
    STANDARD_PALLET = 'STANDARD_PALLET',
    NON_STANDARD_PALLET = 'NON_STANDARD_PALLET',
    BAGS = 'BAGS',
    BALES = 'BALES',
    BOXES = 'BOXES',
    BUNCHES = 'BUNCHES',
    CARPETS = 'CARPETS',
    COILS = 'COILS',
    CRATES = 'CRATES',
    CYLINDERS = 'CYLINDERS',
    DRUMS = 'DRUMS',
    PAILS = 'PAILS',
    REELS = 'REELS',
    ROLLS = 'ROLLS',
    TUBES_PIPES = 'TUBES_PIPES',
    LOOSE = 'LOOSE',
    BUNDLES = 'BUNDLES',
    TOTE = 'TOTE',
}

@Injectable({
  providedIn: 'root',
})
export class ShipmentDataService {
  
  constructor() {

  }

  getProductClassCodes(): number[] {
    return [
        50, 55, 60, 65, 70, 77.5, 85, 92.5,
        100, 110, 125, 150, 175, 200, 250, 300, 400, 500,
    ];
  }

  getUnitType(): Map<ShipmentUnitType, string> {
    return new Map<ShipmentUnitType, string>([
        [ShipmentUnitType.STANDARD_PALLET, 'Pallets(40x48)'],
        [ShipmentUnitType.NON_STANDARD_PALLET, 'Pallets(non-standard)'],
        [ShipmentUnitType.BAGS, 'Bags'],
        [ShipmentUnitType.BALES, 'Bales'],
        [ShipmentUnitType.BOXES, 'Boxes'],
        [ShipmentUnitType.BUNCHES, 'Bunches'],
        [ShipmentUnitType.CARPETS, 'Carpets'],
        [ShipmentUnitType.COILS, 'Coils'],
        [ShipmentUnitType.CRATES, 'Crates'],
        [ShipmentUnitType.CYLINDERS, 'Cylinders'],
        [ShipmentUnitType.DRUMS, 'Drums'],
        [ShipmentUnitType.PAILS, 'Pails'],
        [ShipmentUnitType.REELS, 'Reels'],
        [ShipmentUnitType.ROLLS, 'Rolls'],
        [ShipmentUnitType.TUBES_PIPES, 'Tubes/Pipes'],
        [ShipmentUnitType.LOOSE, '(loose)'],
        [ShipmentUnitType.BUNDLES, 'Bundles'],
        [ShipmentUnitType.TOTE, 'Tote'],
    ]);
  }

  getDescription(): IDescriptionShipmentItem[] {
    return [
        {description: 'cable or wire, armored', nmfc: '30310', productClass: 70},
        {description: 'displays', nmfc: '00', productClass: 200},
        {description: 'fittings', nmfc: '62020', productClass: 55},
        {description: 'general merchandise', nmfc: '168910', productClass: 70},
        {description: 'Partitions, Panels, or Walls', nmfc: '035085-06', productClass: 125},
        {description: 'Pumps', nmfc: '128020-01', productClass: 70},
        {description: 'Safe with walls more than 1 inch', nmfc: '172280', productClass: 70},
        {description: 'Textiles w/density with 2 but less than 4', nmfc: '49390-3', productClass: 250},
        {description: 'Textiles w/density with 4 but less than 6', nmfc: '49390-4', productClass: 175},
        {description: 'Textiles w/density with 6 but less than 8', nmfc: '49390', productClass: 125},
        {description: 'Toilet preparations', nmfc: '059420', productClass: 70},
        {description: 'Toilet preparations', nmfc: '059420', productClass: 85},
    ];
  }

}
