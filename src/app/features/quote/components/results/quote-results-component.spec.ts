import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteResultsComponent } from './quote-results-component';

describe('QuoteComponent', () => {
  let component: QuoteResultsComponent;
  let fixture: ComponentFixture<QuoteResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteResultsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
