import { Component } from '@angular/core';
import { SharedModule } from 'app/shared/modules/shared/shared-module';
import { QuoteResultsComponent } from "./components/results/quote-results-component";
import { OriginComponent } from "./components/origin/origin-component";
import { provideNativeDateAdapter } from '@angular/material/core';
import { DestinationComponent } from "./components/destination/destination-component";
import { ShipmentItemsComponent } from './components/shipment-items/shipment-items-component';


@Component({
  selector: 'app-quote',
  imports: [
    SharedModule,
    OriginComponent,
    QuoteResultsComponent,
    OriginComponent,
    DestinationComponent,
    ShipmentItemsComponent
],
  templateUrl: './quote-component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './quote-component.scss',
})


export class QuoteComponent {
  
  constructor() {}

  ngOnInit() {}

  handleAddRow() {

  }

  openDensityCalculator() {}

}