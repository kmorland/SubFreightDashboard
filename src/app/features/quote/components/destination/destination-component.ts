import { Component, signal } from '@angular/core';
import { form, required } from '@angular/forms/signals';
import { SharedModule } from 'app/shared/modules/shared/shared-module';
import { IDestinationForm } from 'app/shared/interfaces/destination-form-type';

@Component({
  selector: 'app-destination',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './destination-component.html',
  styleUrl: './destination-component.scss',
})
export class DestinationComponent {
  // Destination form model using signal
  public destinationModel = signal<IDestinationForm>({
    country: 'USA/CAN',
    address: '',
    siteType: 'Business',
    nonCommercialDeliverySite: '',
    accessorials: {
      liftGate: false,
      notifyPriorToArrival: false,
      insideDelivery: false,
      appointment: false,
      sortAndSegregate: false,
    },
  });

  // Form using signal-based reactive forms
  public destinationForm = form(this.destinationModel, (schemaPath) => {
    required(schemaPath.country, { message: 'Country is required' });
    required(schemaPath.address, { message: 'Address is required' });
    required(schemaPath.siteType, { message: 'Site type is required' });
  });

  // Non-commercial delivery site options
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
    this.destinationModel.update((model) => ({
      ...model,
      country,
    }));
  }

  // Toggle site type
  toggleSiteType(siteType: 'Business' | 'Residence' | 'TradeShow'): void {
    this.destinationModel.update((model) => ({
      ...model,
      siteType,
    }));
  }

  // Toggle accessorial
  toggleAccessorial(
    accessorial: 'liftGate' | 'notifyPriorToArrival' | 'insideDelivery' | 'appointment' | 'sortAndSegregate'
  ): void {
    this.destinationModel.update((model) => ({
      ...model,
      accessorials: {
        ...model.accessorials,
        [accessorial]: !model.accessorials[accessorial],
      },
    }));
  }

  // Handle form submission
  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.destinationForm().valid()) {
      console.log('Destination Form Data:', this.destinationModel());
      // Add your submission logic here
    }
  }
}
