import { Component, inject, signal } from '@angular/core';
import { SharedModule } from 'app/shared/modules/shared/shared-module';
import { QuoteResultsComponent } from "./components/results/quote-results-component";
import { OriginComponent } from "./components/origin/origin-component";
import { provideNativeDateAdapter } from '@angular/material/core';
import { DestinationComponent } from "./components/destination/destination-component";
import { ShipmentItemsComponent } from './components/shipment-items/shipment-items-component';
import { AdditionalDetailsComponent } from "./components/additional-details/additional-details";
import { IItem, INITIAL_QUOTE, IQuoteForm } from 'app/shared/interfaces/quote-form-type';
import { applyEach, form, required, min } from '@angular/forms/signals';
import { IPartialAddress } from 'app/shared/interfaces/location';
import { QuoteService } from 'app/service/quote.service';


@Component({
  selector: 'app-quote',
  imports: [
    SharedModule,
    OriginComponent,
    QuoteResultsComponent,
    OriginComponent,
    DestinationComponent,
    ShipmentItemsComponent,
    AdditionalDetailsComponent
],
  templateUrl: './quote-component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './quote-component.scss',
})


export class QuoteComponent {

  quoteModel = signal<IQuoteForm>(INITIAL_QUOTE);

  quoteForm = form(this.quoteModel, (schemaPath) => {
    // Origin
    required(schemaPath.origin.address, {message: 'Zipcode or city/state is required'});
    required(schemaPath.origin.pickupDate, {message: 'Pickup Date is required'});
    required(schemaPath.origin.siteType, {message: 'Site type is required'});
    // Destination
    required(schemaPath.destination.address, {message: 'Zipcode or city/state is required'});
    required(schemaPath.destination.siteType, {message: 'Site type is required'});
    // Items validation
    applyEach(schemaPath.items, (itemPath) => {
      required(itemPath.packageType, {message: 'Unit type is required'});
      required(itemPath.pieceCount, {message: 'Number of units is required'});
      min(itemPath.pieceCount, 1, {message: 'Must be at least 1'});
      required(itemPath.productClass, {message: 'Class is required'});
      required(itemPath.palletCount, {message: 'Number of pieces is required'});
      min(itemPath.palletCount, 1, {message: 'Must be at least 1'});
      required(itemPath.weight, {message: 'Weight is required'});
      min(itemPath.weight, 1, {message: 'Weight must be greater than 0'});
    });
  });

  private quoteService: QuoteService = inject(QuoteService);

  constructor() {}

  ngOnInit() {}

  openDensityCalculator() {}

  onOriginAddressSelectedFn(partial: IPartialAddress) {
    this.quoteModel.update(currentModel => ({
      ...currentModel,
      origin: {
        ...currentModel.origin,
        address: {
          ...currentModel.origin.address,
          city: partial.city_name,
          state: partial.state_name,
          postalCode: partial.zip_code
        }
      }
    }));
  }

  onDestinationAddressSelectedFn(partial: IPartialAddress) {
    this.quoteModel.update(currentModel => ({
      ...currentModel,
      destination: {
        ...currentModel.destination,
        address: {
          ...currentModel.origin.address,
          city: partial.city_name,
          state: partial.state_name,
          postalCode: partial.zip_code
        }
      }
    }));
  }

  onAccessorialOriginChange(event: Map<string, boolean>) {
    console.log(event);
    this.quoteModel.update(currentModel => ({
      ...currentModel,
      origin: {
        ...currentModel.origin,
        accessorials: {
          liftGate: event.get('liftGate') ? true : false,
          insidePickup: event.get('insidePickup') ? true : false,
          appointment: event.get('appointment') ? true : false,
        }
      }
    }));
  }

  onAccessorialDestinationChange(event: Map<string, boolean>) {
    console.log(event);
    this.quoteModel.update(currentModel => ({
      ...currentModel,
      destination: {
        ...currentModel.destination,
        accessorials: {
          liftGate: event.get('liftGate') ? true : false,
          notifyPriorToArrival: event.get('notifyPriorToArrival') ? true : false,
          insideDelivery: event.get('insideDelivery') ? true : false,
          sortAndSegregate: event.get('sortAndSegregate') ? true : false,
          appointment: event.get('appointment') ? true : false,
        }
      }
    }));
  }

  onAddItemRow() {
    this.quoteModel.update(currentModel => ({
      ...currentModel,
      items: [...currentModel.items, this.createNewItem()]
    }));
  }

  onRemoveItemRow(index: number) {
    if (this.quoteModel().items.length > 1) {
      this.quoteModel.update(currentModel => ({
        ...currentModel,
        items: currentModel.items.filter((_, i) => i !== index)
      }));
    }
  }

  onSubmit(event: any) {
    event.preventDefault();
    console.log('Quote Form', this.quoteForm().value());
    this.quoteService.createQuote(this.quoteForm().value()).subscribe(result => {
      console.log('result', result);
    });
  }

  onReset() {
    this.quoteModel.set(INITIAL_QUOTE);
  }

  // Create new item model
    private createNewItem(): IItem {
      return {
        pieceCount: 0,
        palletCount: 0,
        length: 0,
        width: 0,
        height: 0,
        weight: 0,
        weightType: 0,
        productClass: 0,
        linearFeet: 0,
        nmfcNumber: '',
        description: '',
        packageType: '',
        hazmat: false,
        haxmatClass: 0,
        stackable: false
        
      };
    }

}