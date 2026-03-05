import { Component, signal, output, input } from '@angular/core';
import { form, required, min, FieldTree } from '@angular/forms/signals';
import { SharedModule } from 'app/shared/modules/shared/shared-module';
import { IShipmentItem } from 'app/shared/interfaces/shipment-item-type';
import { ItemComponent } from '../item/item-component';
import { IItem, IQuoteData, IQuoteForm } from 'app/shared/interfaces/quote-form-type';

@Component({
  selector: 'app-shipment-items',
  standalone: true,
  imports: [SharedModule, ItemComponent],
  templateUrl: './shipment-items-component.html',
  styleUrl: './shipment-items-component.scss',
})
export class ShipmentItemsComponent {
  quoteForm = input.required<FieldTree<IQuoteForm>>();

  // Output events
  densityCalculator = output<void>();
  addItemRow = output<void>();
  removeItemRow = output<number>();

  // Unit type options
  public unitTypes = [
    'Pallet',
    'Skid',
    'Crate',
    'Box',
    'Carton',
    'Drum',
    'Bag',
    'Bale',
    'Bundle',
    'Coil',
    'Reel',
    'Roll',
    'Other',
  ];

  // Class options
  public classOptions = [
    '50', '55', '60', '65', '70', '77.5', '85', '92.5',
    '100', '110', '125', '150', '175', '200', '250', '300', '400', '500',
  ];

  constructor() {}


  // Add new row
  onAddRow(): void {
    this.addItemRow.emit();
  }

  // Remove row
  onRemoveRow(index: number): void {
    this.removeItemRow.emit(index);
  }

  // Toggle weight unit for specific item
  // onWeightUnitToggle(index: number, unit: 'LB' | 'KG'): void {
  //   const itemForm = this.itemForms()[index];
  //   if (itemForm) {
  //     itemForm.model.update((model: IShipmentItem) => ({
  //       ...model,
  //       weightUnit: unit,
  //     }));
  //   }
  // }

  // Toggle dimension unit for specific item
  // onDimensionUnitToggle(index: number, unit: 'IN' | 'FT'): void {
  //   const itemForm = this.itemForms()[index];
  //   if (itemForm) {
  //     itemForm.model.update((model: IShipmentItem) => ({
  //       ...model,
  //       dimensions: {
  //         ...model.dimensions,
  //         unit,
  //       },
  //     }));
  //   }
  // }

  // Toggle stackable for specific item
  // onStackableToggle(index: number): void {
  //   const itemForm = this.itemForms()[index];
  //   if (itemForm) {
  //     itemForm.model.update((model: IShipmentItem) => ({
  //       ...model,
  //       stackable: !model.stackable,
  //     }));
  //   }
  // }

  // Toggle hazmat for specific item
  // onHazmatToggle(index: number): void {
  //   const itemForm = this.itemForms()[index];
  //   if (itemForm) {
  //     itemForm.model.update((model: IShipmentItem) => ({
  //       ...model,
  //       hazmat: !model.hazmat,
  //     }));
  //   }
  // }

  // Calculate total weight
  // getTotalWeight(): number {
  //   return this.items().reduce((total, item) => {
  //     return total + (item.numberOfUnits * item.weight);
  //   }, 0);
  // }

  // // Calculate total density
  // getTotalDensity(): number {
  //   return this.items().reduce((total, item) => {
  //     return total + (item.numberOfUnits * item.density);
  //   }, 0);
  // }

  // // Calculate total volume
  // getTotalVolume(): number {
  //   return this.items().reduce((total, item) => {
  //     const { length, width, height } = item.dimensions;
  //     return total + (item.numberOfUnits * length * width * height);
  //   }, 0);
  // }

  // Emit density calculator event
  onDensityCalculator(): void {
    this.densityCalculator.emit();
  }
}
