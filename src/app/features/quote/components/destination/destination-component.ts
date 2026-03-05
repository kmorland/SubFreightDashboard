import { Component, inject, input, output, signal } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';
import { SharedModule } from 'app/shared/modules/shared/shared-module';
import { IDestinationForm } from 'app/shared/interfaces/destination-form-type';
import { LocationService } from 'app/service/location.service';
import { IPartialAddress } from 'app/shared/interfaces/location';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-destination',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './destination-component.html',
  styleUrl: './destination-component.scss',
})
export class DestinationComponent {
 // Input Form
  destinationForm = input.required<FieldTree<IDestinationForm>>();
  
  // Output
  addressSelected = output<IPartialAddress>();
  accessorialChange = output<Map<string, boolean>>();

  locationService = inject(LocationService);

  searchTerm = signal('');

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

  partialAddresses = toSignal(
    toObservable(this.searchTerm).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((value) => value.length > 2),
      switchMap((value) => this.locationService.getPartialAddress(value))
    ), {initialValue: []}
  );

  displayFn = (partial: IPartialAddress | string): string => {
    if (typeof partial === 'string') {
      return partial;
    }
    return partial && partial.city_name ? `${partial.city_name}, ${partial.state_name} ${partial.zip_code}` : '';
  }

  onAddressSelectedFn(partial: IPartialAddress):void {
    this.addressSelected.emit(partial);
  }

  onAccessorialsChange(event: MatButtonToggleChange) {
    const map: Map<string, boolean> = new Map();
    event.value.forEach((element: string) => {
      map.set(element, true);
    });
    this.accessorialChange.emit(map);
  }

  // Toggle country selection
  // toggleCountry(country: 'USA/CAN' | 'MEX'): void {
  //   this.destinationModel.update((model) => ({
  //     ...model,
  //     country,
  //   }));
  // }

  // // Toggle site type
  // toggleSiteType(siteType: 'Business' | 'Residence' | 'TradeShow'): void {
  //   this.destinationModel.update((model) => ({
  //     ...model,
  //     siteType,
  //   }));
  // }

  // // Toggle accessorial
  // toggleAccessorial(
  //   accessorial: 'liftGate' | 'notifyPriorToArrival' | 'insideDelivery' | 'appointment' | 'sortAndSegregate'
  // ): void {
  //   this.destinationModel.update((model) => ({
  //     ...model,
  //     accessorials: {
  //       ...model.accessorials,
  //       [accessorial]: !model.accessorials[accessorial],
  //     },
  //   }));
  // }

  // // Handle form submission
  // onSubmit(event: Event): void {
  //   event.preventDefault();
  //   if (this.destinationForm().valid()) {
  //     console.log('Destination Form Data:', this.destinationModel());
  //     // Add your submission logic here
  //   }
  // }
}
