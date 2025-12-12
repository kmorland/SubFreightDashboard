import { Component, signal } from '@angular/core';
import { form, required } from '@angular/forms/signals';
import { SharedModule } from 'app/shared/modules/shared/shared-module';
import { IOriginForm } from 'app/shared/interfaces/origin-form-type';

@Component({
  selector: 'app-origin',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './origin-component.html',
  styleUrl: './origin-component.scss',
})
export class OriginComponent {
  // Origin form model using signal
  public originModel = signal<IOriginForm>({
    country: 'USA/CAN',
    address: '',
    siteType: 'Business',
    pickupDate: '',
    nonCommercialPickupSite: '',
    accessorials: {
      liftGate: false,
      insidePickup: false,
      appointment: false,
    },
  });

  // Form using signal-based reactive forms
  public originForm = form(this.originModel, (schemaPath) => {
    required(schemaPath.country, { message: 'Country is required' });
    required(schemaPath.address, { message: 'Address is required' });
    required(schemaPath.siteType, { message: 'Site type is required' });
    required(schemaPath.pickupDate, { message: 'Pickup date is required' });
  });

  // Non-commercial pickup site options
  public nonCommercialOptions = [
    'Airport',
    'Church',
    'Construction Site',
    'Convention Center',
    'Farm',
    'Government Site',
    'Hospital',
    'Hotel/Motel',
    'Military Base',
    'Mine',
    'Nursing Home',
    'Park',
    'Prison',
    'School/University',
    'Storage Facility',
    'Trade Show',
  ];

  // Toggle country selection
  toggleCountry(country: 'USA/CAN' | 'MEX'): void {
    this.originModel.update((model) => ({
      ...model,
      country,
    }));
  }

  // Toggle site type
  toggleSiteType(siteType: 'Business' | 'Residence'): void {
    this.originModel.update((model) => ({
      ...model,
      siteType,
    }));
  }

  // Toggle accessorial
  toggleAccessorial(accessorial: 'liftGate' | 'insidePickup' | 'appointment'): void {
    this.originModel.update((model) => ({
      ...model,
      accessorials: {
        ...model.accessorials,
        [accessorial]: !model.accessorials[accessorial],
      },
    }));
  }

  // Handle date change
  onDateChange(date: Date | null): void {
    this.originModel.update((model) => ({
      ...model,
      pickupDate: (date) ? date.toISOString() : new Date().toISOString(),
    }));
  }

  // Handle form submission
  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.originForm().valid()) {
      console.log('Origin Form Data:', this.originModel());
      // Add your submission logic here
    }
  }
}
