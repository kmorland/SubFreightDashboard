import { Component, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { form, pattern, required } from '@angular/forms/signals';
import { SharedModule } from 'app/modules/shared/shared-module';
import { AddressComponent } from 'app/shared/components/address/address-component';
import { ICustomer } from 'app/shared/interfaces/customer';

export interface CustomerDialogData {
  customer: ICustomer | null;
  isEdit: boolean;
}

@Component({
  selector: 'app-customer-dialog',
  standalone: true,
  imports: [
    SharedModule,
    AddressComponent,
  ],
  templateUrl: './customer-dialog.component.html',
  styleUrl: './customer-dialog.component.scss',
})
export class CustomerDialogComponent {
  public customerModel = signal<ICustomer>({
    customerId: 0,
    businessName: '',
    contactName: '',
    emailAddress: '',
    phone: '',
    address: {
      address: '',
      address2: '',
      city: '',
      state: '',
      postalCode: '',
    }
  });

  public customerForm = form(this.customerModel, (schemaPath) => {
    required(schemaPath.businessName, { message: 'Business name is required' });
    required(schemaPath.contactName, { message: 'Contact name is required' });
    required(schemaPath.emailAddress, { message: 'Email is required' });
    required(schemaPath.phone, { message: 'Phone is required' });
    required(schemaPath.address.address, { message: 'Address is required' });
    required(schemaPath.address.city, { message: 'City is required' });
    required(schemaPath.address.state, { message: 'State is required' });
    required(schemaPath.address.postalCode, { message: 'Postal code is required' });
    pattern(schemaPath.address.postalCode, new RegExp('/^[0-9]$/'), { message: 'Postal code must be a digit, 0-9' });
  });

  constructor(
    public dialogRef: MatDialogRef<CustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CustomerDialogData
  ) {
    if (data.customer) {
      this.customerModel.set({ ...data.customer });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.customerModel());
  }
}
