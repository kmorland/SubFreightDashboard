import { Component, input, output } from '@angular/core';
import { SharedModule } from 'app/shared/modules/shared/shared-module';
import { IQuoteSummary } from 'app/shared/interfaces/quote-result';

@Component({
  selector: 'app-results-sidebar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './results-sidebar-component.html',
  styleUrl: './results-sidebar-component.scss',
})
export class ResultsSidebarComponent {
  summary = input.required<IQuoteSummary>();

  reRate = output<void>();

  pickupAccessorials = [
    { key: 'liftGate', label: 'Liftgate Pickup' },
    { key: 'insidePickup', label: 'Inside Pickup' },
    { key: 'protectFromFreeze', label: 'Protect From Freeze' },
    { key: 'appointment', label: 'Appointment Required' },
  ];

  deliveryAccessorials = [
    { key: 'liftGate', label: 'Liftgate Delivery' },
    { key: 'notifyPriorToArrival', label: 'Notify Prior To Arrival' },
    { key: 'insideDelivery', label: 'Inside Delivery' },
    { key: 'sortAndSegregate', label: 'Sort & Segregate' },
    { key: 'appointment', label: 'Appointment Required' },
  ];

  nonCommercialPickupOptions = [
    'Airport',
    'Church',
    'Construction Site',
    'Farm',
    'Government Site',
    'Hospital',
    'Hotel/Motel',
    'Military Base',
    'Mine',
    'Nursing Home',
    'School/University',
    'Storage Facility',
  ];

  nonCommercialDeliveryOptions = [
    'Airport',
    'Church',
    'Construction Site',
    'Farm',
    'Government Site',
    'Hospital',
    'Hotel/Motel',
    'Military Base',
    'Mine',
    'Nursing Home',
    'School/University',
    'Storage Facility',
    'Terminal Pickup',
  ];

  onReRate(): void {
    this.reRate.emit();
  }

  isPickupAccessorialSelected(key: string): boolean {
    return this.summary()?.pickupOptions?.accessorials?.includes(key) ?? false;
  }

  isDeliveryAccessorialSelected(key: string): boolean {
    return this.summary()?.deliveryOptions?.accessorials?.includes(key) ?? false;
  }

  getSiteTypeLabel(type: string): string {
    switch (type) {
      case 'business': return 'Business';
      case 'residence': return 'Residence';
      case 'tradeshow': return 'TradeShow';
      case 'terminal': return 'Terminal Drop Off';
      default: return type;
    }
  }
}
