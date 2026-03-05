import { Component, effect, input, output } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';
import { MatSelectChange } from '@angular/material/select';
import { IDescriptionShipmentItem, ShipmentDataService, ShipmentUnitType } from 'app/service/shipment-data.service';
import { IItem } from 'app/shared/interfaces/quote-form-type';
import { IShipmentItem } from 'app/shared/interfaces/shipment-item-type';
import { SharedModule } from 'app/shared/modules/shared/shared-module';

@Component({
  selector: 'tr[app-item]',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './item-component.html',
  styleUrl: './item-component.scss',
})
export class ItemComponent {
  // Input signals
  itemForm = input.required<FieldTree<IItem>>(); // Form control from parent
  //itemModel = input.required<any>(); // Model signal from parent
  //unitTypes = input.required<string[]>();
  //classOptions = input.required<string[]>();

  // Output events
  weightUnitToggle = output<'LB' | 'KG'>();
  dimensionUnitToggle = output<'IN' | 'FT'>();
  stackableToggle = output<void>();
  hazmatToggle = output<void>();
  deleteItem = output<void>();

  // variables for template
  unitTypes: Map<ShipmentUnitType, string>;
  productClassOptions: number[] = [];
  descriptions: IDescriptionShipmentItem[] = [];

  private shipmentDataService: ShipmentDataService;

  constructor(shipmentDataService: ShipmentDataService) {
    this.shipmentDataService = shipmentDataService;
    this.unitTypes = this.shipmentDataService.getUnitType();
    this.productClassOptions = this.shipmentDataService.getProductClassCodes();
    this.descriptions = this.shipmentDataService.getDescription();
  }

  ngInit() {
    this.itemForm().packageType().setControlValue('null');
    //console.log(this.unitTypes());
    //console.log(this.itemModel())
  }

  // Preserve original order for keyvalue pipe
  originalOrder = (): number => {
    return 0;
  }

  onUnitTypeChangeHandler(event: Event) {
    const value: string = this.itemForm().packageType().value();
    // Reset length and width, to 0 first.
    this.itemForm().length().setControlValue(0);
    this.itemForm().width().setControlValue(0);
    
    if(value === ShipmentUnitType.STANDARD_PALLET) {
        this.itemForm().length().setControlValue(40);
        this.itemForm().width().setControlValue(48);
    }
  }

  onDescriptionChange(event: Event) {
    console.log(event);
    const index: number | string = this.itemForm().description().value();
    console.log(index);
    const item = this.descriptions[Number(index)];
    this.itemForm().nmfcNumber().setControlValue(item.nmfc);
    this.itemForm().productClass().setControlValue(item.productClass);

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
