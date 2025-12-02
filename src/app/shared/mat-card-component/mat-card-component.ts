import { Component, input } from '@angular/core';
import { ICardData } from '../interfaces/card-data-type';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-mat-card-component',
  imports: [MatCardModule, MatChipsModule, CurrencyPipe],
  templateUrl: './mat-card-component.html',
  styleUrl: './mat-card-component.scss',
})
export class MatCardComponent {
  data = input<ICardData>();

  ngOnInit() {
    console.log('data ', this.data());
  }

  get hasChildrenLinks() {
    const data = this.data();
    return data?.links && data.links.length > 0;
  }

  get isCurrencyType() {
    const data = this.data();
    return data?.type === 'CURRENCY';
  }

  get isTextType() {
    const data = this.data();
    return data?.type === 'TEXT';
  }
}
