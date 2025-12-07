import { Component, input, signal } from '@angular/core';
import { Field, FieldTree } from '@angular/forms/signals';
import { MatInputModule } from '@angular/material/input';
import { IAddress } from 'app/shared/interfaces/quote-form-type';
import { MatDatepickerModule } from '@angular/material/datepicker';
import statesJson from 'app/shared/data/states.json';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-address-component',
  imports: [MatInputModule, Field, MatDatepickerModule, MatSelectModule],
  templateUrl: './address-component.html',
  styleUrl: './address-component.scss',
})
export class AddressComponent {
  addressField = input.required<FieldTree<IAddress>>();
  states = signal(statesJson);
  
  constructor() {}

  ngOnInit() {}
}
