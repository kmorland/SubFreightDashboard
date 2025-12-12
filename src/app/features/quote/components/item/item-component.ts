import { Component, input, output } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';
import { IShipmentItem } from 'app/shared/interfaces/shipment-item-type';
import { SharedModule } from 'app/shared/modules/shared/shared-module';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './item-component.html',
  styleUrl: './item-component.scss',
})
export class ItemComponent {
  // Input signals
  itemForm = input.required<FieldTree<IShipmentItem>>(); // Form control from parent
  itemModel = input.required<any>(); // Model signal from parent
  unitTypes = input.required<string[]>();
  classOptions = input.required<string[]>();

  // Output events
  weightUnitToggle = output<'LB' | 'KG'>();
  dimensionUnitToggle = output<'IN' | 'FT'>();
  stackableToggle = output<void>();
  hazmatToggle = output<void>();
  deleteItem = output<void>();

  ngInit() {
    console.log(this.unitTypes());
    console.log(this.itemModel())
  }

  // Toggle weight unit
  toggleWeightUnit(unit: 'LB' | 'KG'): void {
    this.weightUnitToggle.emit(unit);
  }

  // Toggle dimension unit
  toggleDimensionUnit(unit: 'IN' | 'FT'): void {
    this.dimensionUnitToggle.emit(unit);
  }

  // Toggle stackable
  toggleStackable(): void {
    this.stackableToggle.emit();
  }

  // Toggle hazmat
  toggleHazmat(): void {
    this.hazmatToggle.emit();
  }

  // Delete item
  onDelete(): void {
    this.deleteItem.emit();
  }
}
