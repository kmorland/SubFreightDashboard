import { Component, input } from '@angular/core';
import { ICardData } from 'app/shared/interfaces/card-data-type';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-card-component',
  imports: [MatCardModule, MatChipsModule, CurrencyPipe],
  templateUrl: './card-component.html',
  styleUrl: './card-component.scss',
})
export class CardComponent {
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
