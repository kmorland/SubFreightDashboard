import { Component, inject, OnInit, signal } from '@angular/core';
import { SharedModule } from 'app/shared/modules/shared/shared-module';
import { IQuoteResult, IQuoteSummary, SortOption } from 'app/shared/interfaces/quote-result';
import { ResultCardComponent } from '../result-card/result-card-component';
import { ResultsSidebarComponent } from '../results-sidebar/results-sidebar-component';
import { HttpClient } from '@angular/common/http';

interface QuoteResultsData {
  summary: IQuoteSummary;
  results: IQuoteResult[];
}

@Component({
  selector: 'app-quote-results',
  standalone: true,
  imports: [
    SharedModule,
    ResultCardComponent,
    ResultsSidebarComponent,
  ],
  templateUrl: './quote-results-component.html',
  styleUrl: './quote-results-component.scss',
})
export class QuoteResultsComponent implements OnInit {
  private http = inject(HttpClient);

  summary = signal<IQuoteSummary | null>(null);
  results = signal<IQuoteResult[]>([]);
  sortOption = signal<SortOption>('lowestCost');
  searchTerm = signal('');

  sortOptions: { value: SortOption; label: string }[] = [
    { value: 'lowestCost', label: 'Lowest Cost' },
    { value: 'dbe', label: 'DBE' },
    { value: 'quickestDelivery', label: 'Quickest Delivery' },
    { value: 'favorites', label: 'My favorite Carriers' },
  ];

  ngOnInit(): void {
    this.loadMockData();
  }

  private loadMockData(): void {
    this.http.get<QuoteResultsData>('data/quote-results.json').subscribe({
      next: (data) => {
        this.summary.set(data.summary);
        this.results.set(data.results);
      },
      error: (err) => {
        console.error('Error loading quote results:', err);
      }
    });
  }

  onSortChange(option: SortOption): void {
    this.sortOption.set(option);
    this.sortResults();
  }

  private sortResults(): void {
    const currentResults = [...this.results()];

    switch (this.sortOption()) {
      case 'lowestCost':
        currentResults.sort((a, b) => a.pricing.withInsurance - b.pricing.withInsurance);
        break;
      case 'quickestDelivery':
        currentResults.sort((a, b) => a.transitDays - b.transitDays);
        break;
      case 'favorites':
        currentResults.sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0));
        break;
      case 'dbe':
        currentResults.sort((a, b) => (b.dbe ? 1 : 0) - (a.dbe ? 1 : 0));
        break;
    }

    this.results.set(currentResults);
  }

  onSearch(term: string): void {
    this.searchTerm.set(term);
  }

  onReRate(): void {
    console.log('Re-rating with updated options...');
  }

  onBookWithInsurance(result: IQuoteResult): void {
    console.log('Booking with insurance:', result);
  }

  onBookWithoutInsurance(result: IQuoteResult): void {
    console.log('Booking without insurance:', result);
  }

  onSaveQuote(result: IQuoteResult): void {
    console.log('Saving quote:', result);
  }

  onAddToFavorites(result: IQuoteResult): void {
    const updatedResults = this.results().map(r =>
      r.id === result.id ? { ...r, isFavorite: !r.isFavorite } : r
    );
    this.results.set(updatedResults);
  }

  onModifyDeclaredValue(result: IQuoteResult): void {
    console.log('Modifying declared value for:', result);
  }

  get filteredResults(): IQuoteResult[] {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.results();

    return this.results().filter(r =>
      r.carrierName.toLowerCase().includes(term)
    );
  }
}
