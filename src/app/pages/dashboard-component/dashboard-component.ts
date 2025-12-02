import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardComponent } from '../../shared/mat-card-component/mat-card-component';
import { ICardData, MatCardType } from '../../shared/interfaces/card-data-type';

@Component({
  selector: 'app-dashboard-component',
  imports: [MatGridListModule, MatCardComponent],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.scss',
})
export class DashboardComponent {
  public currentMonthSpend!: ICardData;
  public yearToDateSpend!: ICardData;
  public averageCostPerShipment!: ICardData;
  public amountOwned!: ICardData;

  public currentMonthShipments!: ICardData;
  public pendingMonthShipments!: ICardData;
  public averageSaved!: ICardData;

  ngOnInit() {
    this.currentMonthSpend = {
      type: MatCardType.Currency,
      heading: 'Current Month Spend',
      description: 95456
    }

    this.yearToDateSpend = {
      type: MatCardType.Currency,
      heading: 'YTD Spend',
      description: 950456
    }

    this.amountOwned = {
      type: MatCardType.Currency,
      heading: 'Amount Owned',
      description: 12354
    }

    this.averageCostPerShipment = {
      type: MatCardType.Currency,
      heading: 'Average Cost Per Shipment',
      description: 9236
    }

    this.averageSaved = {
      type: MatCardType.Currency,
      heading: 'Average Cost Saved',
      description: 112
    }

    this.currentMonthShipments = {
      type: MatCardType.Text,
      heading: 'Current Month Shipments',
      description: 12
    }

    this.pendingMonthShipments = {
      type: MatCardType.Text,
      heading: 'Pending Shipments',
      description: 0
    }
  }
}

