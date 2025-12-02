import { Component, signal } from '@angular/core';
import { IQuoteData } from '../../shared/interfaces/quote-form-type';
import { form, Field } from '@angular/forms/signals';
import statesJson from '../../shared/data/states.json';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-quote-component',
  imports: [Field, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatTableModule],
  templateUrl: './quote-component.html',
  styleUrl: './quote-component.scss',
})


export class QuoteComponent {
  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  public quoteModel = signal<IQuoteData>({
    origin: {
      address: '',
      address2: '',
      city: '',
      state: '',
      postalCode: ''
    },
    destination: {
      address: '',
      address2: '',
      city: '',
      state: '',
      postalCode: ''
    },
    pickup: new Date(),
    delivery: new Date(),
    items: []
  });

  public quoteForm = form(this.quoteModel);
  public states = signal(statesJson);

  ngOnInit() {
    
  }

  onStateSelectionChange(event: MatSelectChange) {
    console.log(event);
  }

  onQuoteSubmit(event: Event) {
    event.preventDefault();
    console.log(event);
    console.log(this.quoteForm().value());
  }

  onTableRowClick(event: Event, element: any) {
    console.log(event, element);
  }
}
