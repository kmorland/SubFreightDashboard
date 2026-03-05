import { Component, inject, input, OnInit, output, Signal, signal } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';
import { SharedModule } from 'app/shared/modules/shared/shared-module';
import { IOriginForm } from 'app/shared/interfaces/origin-form-type';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { LocationService } from 'app/service/location.service';
import { IPartialAddress } from 'app/shared/interfaces/location';
import { DataService, IAccessorialData } from 'app/service/data.service';
import { MatSelectChange } from '@angular/material/select';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-origin',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './origin-component.html',
  styleUrl: './origin-component.scss',
})
export class OriginComponent implements OnInit {
  // Input form
  originForm = input.required<FieldTree<IOriginForm>>();
  // Output
  addressSelected = output<IPartialAddress>();
  accessorialChange = output<Map<string, boolean>>();

  locationService = inject(LocationService);
  dataService = inject(DataService);

  searchTerm = signal('');

  // Non-commercial pickup site options
  // public nonCommercialOptions = [
  //   'Airport',
  //   'Church',
  //   'Construction Site',
  //   'Convention Center',
  //   'Farm',
  //   'Government Site',
  //   'Hospital',
  //   'Hotel/Motel',
  //   'Military Base',
  //   'Mine',
  //   'Nursing Home',
  //   'Park',
  //   'Prison',
  //   'School/University',
  //   'Storage Facility',
  //   'Trade Show',
  // ];

  nonCommercialOptions = toSignal(this.dataService.getAccessorialData('origin'));

  partialAddresses = toSignal(
    toObservable(this.searchTerm).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((value) => value.length > 2),
      switchMap((value) => this.locationService.getPartialAddress(value))
    ), {initialValue: []}
  );

  accessorialMap!: Map<number, IAccessorialData>;
  accessorMap!: Map<string, boolean>;

  ngOnInit(): void {
    this.accessorialMap = this.dataService.accessorialMap;
    console.log(this.accessorialMap);
  }

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
  //   this.originModel.update((model) => ({
  //     ...model,
  //     country,
  //   }));
  // }

  // Toggle site type
  // toggleSiteType(siteType: 'Business' | 'Residence'): void {
  //   this.originModel.update((model) => ({
  //     ...model,
  //     siteType,
  //   }));
  // }

  // Toggle accessorial
  // toggleAccessorial(accessorial: 'liftGate' | 'insidePickup' | 'appointment'): void {
  //   this.originModel.update((model) => ({
  //     ...model,
  //     accessorials: {
  //       ...model.accessorials,
  //       [accessorial]: !model.accessorials[accessorial],
  //     },
  //   }));
  // }

  // Handle date change
  // onDateChange(date: Date | null): void {
  //   this.originModel.update((model) => ({
  //     ...model,
  //     pickupDate: (date) ? date.toISOString() : new Date().toISOString(),
  //   }));
  // }

  // Handle form submission
  // onSubmit(event: Event): void {
  //   event.preventDefault();
  //   if (this.originForm().valid()) {
  //     console.log('Origin Form Data:', this.originModel());
  //     // Add your submission logic here
  //   }
  // }
}
function fromEvent() {
  throw new Error('Function not implemented.');
}

