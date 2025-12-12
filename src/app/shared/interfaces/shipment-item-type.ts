export interface IShipmentItem {
  unitType: string;
  numberOfUnits: number;
  description: string;
  nmfc: string;
  class: string;
  numberOfPieces: number;
  weight: number;
  weightUnit: 'LB' | 'KG';
  dimensions: {
    length: number;
    width: number;
    height: number;
    unit: 'IN' | 'FT';
  };
  density: number;
  stackable: boolean;
  hazmat: boolean;
}
