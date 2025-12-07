import { Component } from '@angular/core';
import { SharedModule } from "app/shared/modules/shared/shared-module";
import { CardComponent } from './components/card-component';
import { ICardData, CardType } from 'app/shared/interfaces/card-data-type';

@Component({
  selector: 'app-dashboard',
  imports: [
    SharedModule,
    CardComponent
  ],
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
      type: CardType.Currency,
      heading: 'Current Month Spend',
      description: 95456
    }

    this.yearToDateSpend = {
      type: CardType.Currency,
      heading: 'YTD Spend',
      description: 950456
    }

    this.amountOwned = {
      type: CardType.Currency,
      heading: 'Amount Owned',
      description: 12354
    }

    this.averageCostPerShipment = {
      type: CardType.Currency,
      heading: 'Average Cost Per Shipment',
      description: 9236
    }

    this.averageSaved = {
      type: CardType.Currency,
      heading: 'Average Cost Saved',
      description: 112
    }

    this.currentMonthShipments = {
      type: CardType.Text,
      heading: 'Current Month Shipments',
      description: 12
    }

    this.pendingMonthShipments = {
      type: CardType.Text,
      heading: 'Pending Shipments',
      description: 0
    }
  }

}
