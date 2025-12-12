import { Component, signal, output } from '@angular/core';
import { form, required, min } from '@angular/forms/signals';
import { SharedModule } from 'app/shared/modules/shared/shared-module';
import { IShipmentItem } from 'app/shared/interfaces/shipment-item-type';
import { ItemComponent } from '../item/item-component';

@Component({
  selector: 'app-shipment-items',
  standalone: true,
  imports: [SharedModule, ItemComponent],
  templateUrl: './shipment-items-component.html',
  styleUrl: './shipment-items-component.scss',
})
export class ShipmentItemsComponent {
  // Output events
  densityCalculator = output<void>();

  // Shipment items collection
  public items = signal<IShipmentItem[]>([this.createNewItem()]);

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

  // Item forms array
  public itemForms = signal<any[]>([]);

  constructor() {
    // Initialize first item form
    this.initializeItemForm(0);
  }

  // Create new item model
  private createNewItem(): IShipmentItem {
    return {
      unitType: '',
      numberOfUnits: 0,
      description: '',
      nmfc: '',
      class: '00',
      numberOfPieces: 0,
      weight: 0,
      weightUnit: 'LB',
      dimensions: {
        length: 0,
        width: 0,
        height: 0,
        unit: 'IN',
      },
      density: 0,
      stackable: false,
      hazmat: false,
    };
  }

  // Initialize item form
  private initializeItemForm(index: number): void {
    const item = this.items()[index];
    const itemModel = signal(item);

    const itemForm = form(itemModel, (schemaPath) => {
      required(schemaPath.unitType, { message: 'Unit type is required' });
      required(schemaPath.numberOfUnits, { message: 'Number of units is required' });
      min(schemaPath.numberOfUnits, 1, { message: 'Must be at least 1' });
      required(schemaPath.description, { message: 'Description is required' });
      required(schemaPath.numberOfPieces, { message: 'Number of pieces is required' });
      min(schemaPath.numberOfPieces, 1, { message: 'Must be at least 1' });
      required(schemaPath.weight, { message: 'Weight is required' });
      min(schemaPath.weight, 1, { message: 'Must be greater than 0' });
    });

    this.itemForms.update(forms => {
      const newForms = [...forms];
      newForms[index] = { form: itemForm, model: itemModel };
      return newForms;
    });
  }

  // Add new row
  onAddRow(): void {
    this.items.update(items => [...items, this.createNewItem()]);
    this.initializeItemForm(this.items().length - 1);
  }

  // Remove row
  onRemoveRow(index: number): void {
    if (this.items().length > 1) {
      this.items.update(items => items.filter((_, i) => i !== index));
      this.itemForms.update(forms => forms.filter((_, i) => i !== index));
    }
  }

  // Toggle weight unit for specific item
  onWeightUnitToggle(index: number, unit: 'LB' | 'KG'): void {
    const itemForm = this.itemForms()[index];
    if (itemForm) {
      itemForm.model.update((model: IShipmentItem) => ({
        ...model,
        weightUnit: unit,
      }));
    }
  }

  // Toggle dimension unit for specific item
  onDimensionUnitToggle(index: number, unit: 'IN' | 'FT'): void {
    const itemForm = this.itemForms()[index];
    if (itemForm) {
      itemForm.model.update((model: IShipmentItem) => ({
        ...model,
        dimensions: {
          ...model.dimensions,
          unit,
        },
      }));
    }
  }

  // Toggle stackable for specific item
  onStackableToggle(index: number): void {
    const itemForm = this.itemForms()[index];
    if (itemForm) {
      itemForm.model.update((model: IShipmentItem) => ({
        ...model,
        stackable: !model.stackable,
      }));
    }
  }

  // Toggle hazmat for specific item
  onHazmatToggle(index: number): void {
    const itemForm = this.itemForms()[index];
    if (itemForm) {
      itemForm.model.update((model: IShipmentItem) => ({
        ...model,
        hazmat: !model.hazmat,
      }));
    }
  }

  // Calculate total weight
  getTotalWeight(): number {
    return this.items().reduce((total, item) => {
      return total + (item.numberOfUnits * item.weight);
    }, 0);
  }

  // Calculate total density
  getTotalDensity(): number {
    return this.items().reduce((total, item) => {
      return total + (item.numberOfUnits * item.density);
    }, 0);
  }

  // Calculate total volume
  getTotalVolume(): number {
    return this.items().reduce((total, item) => {
      const { length, width, height } = item.dimensions;
      return total + (item.numberOfUnits * length * width * height);
    }, 0);
  }

  // Emit density calculator event
  onDensityCalculator(): void {
    this.densityCalculator.emit();
  }
}
