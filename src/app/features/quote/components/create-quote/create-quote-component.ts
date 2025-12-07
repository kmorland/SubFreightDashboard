import { Component, signal } from '@angular/core';
import { IQuoteData } from 'app//shared/interfaces/quote-form-type';
import { form, required, pattern } from '@angular/forms/signals';
import { MatSelectChange } from '@angular/material/select';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { LocationType, getLocationTypeString } from 'app/data/location-type.enum';
import { ShippingType, getShippingTypeString } from 'app/data/shipping-type.enum';
import { PackageType, getPackageTypeString } from 'app/data/package-type.enum';
import {provideNativeDateAdapter} from '@angular/material/core';
import { AuthService } from 'app/service/auth-service';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import customerJson from 'app/shared/data/customers.json';
import { ICustomer } from 'app/shared/interfaces/customer';
import { CustomerService } from 'app/service/customer.service';
import { LookupDataService } from 'app/service/lookup-data.service';
import { SharedModule } from 'app/shared/modules/shared/shared-module';
import { AddressComponent } from 'app/shared/components/address/address-component';


@Component({
  selector: 'app-create-quote',
  imports: [
    SharedModule,
    AddressComponent,
  ],
  templateUrl: './create-quote-component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './create-quote-component.scss',
})


export class CreateQuoteComponent {
  private authService: AuthService;
  private customerService : CustomerService;
  private lookupDataService: LookupDataService;
  public isSubmitting: boolean = false;
  public isCustomDimensions: boolean = false;
  public LocationType = LocationType;
  public ShippingType = ShippingType;
  public PackageType = PackageType;
  filteredOptions: Observable<ICustomer[]> = new Observable();
  customers: ICustomer[] = customerJson;

  
  public quoteModel = signal<IQuoteData>({
    origin: {
      address: '',
      address2: '',
      city: '',
      state: '',
      postalCode: '',
      pickupDate: null,
      pickupTime: '',
    },
    destination: {
      address: '',
      address2: '',
      city: '',
      state: '',
      postalCode: '',
      dropOffDate: new Date(),
      dropOffTime: '',
    },
    items: [{
      length: 0,
      width: 0,
      height: 0,
      weight: 0,
      weightType: 0,
      description: '',
      hazmat: false,
      haxmatClass: 0,
      productClass: 0,
      stackable: false,
      quantity: 0,
    }],
    accessorials: [],
    customerSearch: '',
  });

  public quoteForm = form(this.quoteModel, (schemaPath) => {
    required(schemaPath.origin.address, {message: 'Address is required'});
    required(schemaPath.origin.city, {message: 'City code is required'});
    required(schemaPath.origin.postalCode, {message: 'Postal code is required'});
    pattern(schemaPath.origin.postalCode, new RegExp('[0-9]*'));

    required(schemaPath.destination.address, {message: 'Address is required'});
    required(schemaPath.destination.city, {message: 'City code is required'});
    required(schemaPath.destination.postalCode, {message: 'Postal code is required'});
    pattern(schemaPath.destination.postalCode, new RegExp('[0-9]*'));
  });
  public timeList: any;

  constructor(authService: AuthService, customerService: CustomerService, lookupDataService: LookupDataService) {
    this.authService = authService;
    this.customerService = customerService;
    this.lookupDataService = lookupDataService;
  }

  ngOnInit() {
    // Update Origin in QuoteForm with, logged in user company details
    this.quoteForm.origin.address().value.set(this.authService.getCurrentUser.company.address);
    this.quoteForm.origin.address2().value.set(this.authService.getCurrentUser.company.address2);
    this.quoteForm.origin.city().value.set(this.authService.getCurrentUser.company.city);
    this.quoteForm.origin.state().value.set(this.authService.getCurrentUser.company.state);
    this.quoteForm.origin.postalCode().value.set(this.authService.getCurrentUser.company.postalCode);

    this.timeList = this.lookupDataService.generate30MinuteIntervalTimes();
  }

  onCustomerSearchChange(_event: Event) {
    this.filteredOptions = this.customerService.searchForCustomers( this.quoteForm.customerSearch().value() );
  }

  public keys(value: {}) {
    const keys = Object.keys(value);
    return keys.slice(0, keys.length / 2);
  }

  onStateSelectionChange(event: MatSelectChange) {
    console.log(event);
  }

  onSelectedCustomer(event: MatAutocompleteSelectedEvent) {
    console.log(event);
    this.quoteForm.destination().setControlValue(event.option.value.address);
  }

  displayCustomerFn(obj: ICustomer | string): string {
    return typeof obj === 'string' ? obj : obj?.businessName || '';
  }

  public onShippingPackageChange(event: any) {
    this.isCustomDimensions = (event.value === PackageType.PalletsCustom.toString()) ? true : false;
    /*if (!this.isCustomDimensions) {
      this.form.patchValue({ shipping: { shippingLength: '', shippingWidth: '', shippingHeight: '' } });
    }*/
  }

  onOriginTimeSelectionChange(event: MatSelectChange) {
    this.quoteForm.origin().setControlValue({
      ...this.quoteForm.origin().value(),
      pickupTime: event.value
    });
  }

  onOriginDateChange(event: MatDatepickerInputEvent<Date>) {
    this.quoteForm.origin().setControlValue({
      ...this.quoteForm.origin().value(),
      pickupDate: event.value
    });
  }

  onDestinationTimeSelectionChange(event: MatSelectChange) {
    this.quoteForm.destination().setControlValue({
      ...this.quoteForm.destination().value(),
      pickupTime: event.value
    });
  }

  onDestinationDateChange(event: MatDatepickerInputEvent<Date>) {
    this.quoteForm.destination().setControlValue({
      ...this.quoteForm.destination().value(),
      pickupDate: event.value
    });
  }

  public onReset(event: MouseEvent) {
    this.isCustomDimensions = false;
  }

  public onSubmit(event: MouseEvent) {
    event.preventDefault();
    console.log(event);
    console.log(this.quoteForm().value());
    this.isSubmitting = true;
    /*this.form.disable();

    //Transform pickupDate in origin
    const pickupDate: Date = this.form.value.origin.pickupDate;
    this.form.value.origin.pickupDate = this.datePipe.transform( pickupDate, 'yyyy-MM-dd' );
    //Just For Sample data, till backend is adjusted
    this.form.value.origin.accessories = 11;
    this.form.value.destination.accessories = 11;

    this.quoteService.createQuote(this.form.value);
    console.log( this.form.value );
    this.quoteService.getQuote( this.form.value as QuoteRequest ).subscribe( (quote: any) => {
      console.log(quote);
    });*/
  }

  get getLocationTypeString() {
    return getLocationTypeString;
  }
  
  get getShippingTypeString() {
    return getShippingTypeString;
  }

  get getPackageTypeString() {
    return getPackageTypeString
  }

  get addressForm() {
    return this.quoteForm.origin;
  }
}