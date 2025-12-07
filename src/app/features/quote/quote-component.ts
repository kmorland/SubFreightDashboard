import { Component } from '@angular/core';
import { SharedModule } from 'app/modules/shared/shared-module';
import { CreateQuoteComponent } from "./components/create-quote/create-quote-component";
import { QuoteResultsComponent } from "./components/results/quote-results-component";


@Component({
  selector: 'app-quote',
  imports: [
    SharedModule,
    CreateQuoteComponent,
    QuoteResultsComponent
],
  templateUrl: './quote-component.html',
  providers: [],
  styleUrl: './quote-component.scss',
})


export class QuoteComponent {
  
  constructor() {}

  ngOnInit() {}

}