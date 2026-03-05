import { Component, input, output } from '@angular/core';
import { SharedModule } from 'app/shared/modules/shared/shared-module';
import { IQuoteResult } from 'app/shared/interfaces/quote-result';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-result-card',
  standalone: true,
  imports: [SharedModule, CurrencyPipe],
  templateUrl: './result-card-component.html',
  styleUrl: './result-card-component.scss',
})
export class ResultCardComponent {
  result = input.required<IQuoteResult>();

  bookWithInsurance = output<IQuoteResult>();
  bookWithoutInsurance = output<IQuoteResult>();
  saveQuote = output<IQuoteResult>();
  addToFavorites = output<IQuoteResult>();
  modifyDeclaredValue = output<IQuoteResult>();

  selectedInsuranceOption: 'with' | 'without' = 'with';

  onBookWithInsurance(): void {
    this.bookWithInsurance.emit(this.result());
  }

  onBookWithoutInsurance(): void {
    this.bookWithoutInsurance.emit(this.result());
  }

  onSaveQuote(): void {
    this.saveQuote.emit(this.result());
  }

  onAddToFavorites(): void {
    this.addToFavorites.emit(this.result());
  }

  onModifyDeclaredValue(): void {
    this.modifyDeclaredValue.emit(this.result());
  }

  selectInsuranceOption(option: 'with' | 'without'): void {
    this.selectedInsuranceOption = option;
  }
}
