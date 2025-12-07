import { Component, signal } from '@angular/core';
import { form, required } from '@angular/forms/signals';
import { SharedModule } from 'app/modules/shared/shared-module';
import { AddressComponent } from 'app/shared/components/address/address-component';
import { AccountProfileService } from 'app/service/account-profile.service';
import { IAccountProfile } from 'app/shared/interfaces/account-profile';
import { ICustomer } from 'app/shared/interfaces/customer';
import { MatDialog } from '@angular/material/dialog';
import { CustomerDialogComponent } from './components/customer-dialog/customer-dialog.component';
import { DeleteConfirmDialogComponent } from './components/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-account-profile',
  standalone: true,
  imports: [
    SharedModule,
    AddressComponent,
  ],
  templateUrl: './account-profile.component.html',
  styleUrl: './account-profile.component.scss',
})
export class AccountProfileComponent {
  private accountProfileService: AccountProfileService;
  private dialog: MatDialog;
  public isLoading = signal(true);
  public isSaving = signal(false);

  public accountModel = signal<IAccountProfile>({
    accountId: '',
    email: '',
    company: {
      companyName: '',
      contactName: '',
      address: {
        address: '',
        address2: '',
        city: '',
        state: '',
        postalCode: '',
      }
    },
    customers: []
  });

  public accountForm = form(this.accountModel, (schemaPath) => {
    required(schemaPath.company.companyName, { message: 'Company name is required' });
    required(schemaPath.company.contactName, { message: 'Contact name is required' });
    required(schemaPath.company.address.address, { message: 'Address is required' });
    required(schemaPath.company.address.city, { message: 'City is required' });
    required(schemaPath.company.address.state, { message: 'State is required' });
    required(schemaPath.company.address.postalCode, { message: 'Postal code is required' });
  });

  displayedColumns: string[] = ['businessName', 'contactName', 'emailAddress', 'phone', 'actions'];

  constructor(accountProfileService: AccountProfileService, dialog: MatDialog) {
    this.accountProfileService = accountProfileService;
    this.dialog = dialog;
  }

  ngOnInit() {
    this.loadAccountProfile();
  }

  loadAccountProfile() {
    this.isLoading.set(true);
    this.accountProfileService.getAccountProfile().subscribe({
      next: (profile) => {
        this.accountModel.set(profile);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading account profile:', error);
        this.isLoading.set(false);
      }
    });
  }

  saveAccountProfile() {
    this.isSaving.set(true);
    this.accountProfileService.updateAccountProfile(this.accountModel()).subscribe({
      next: (profile) => {
        this.isSaving.set(false);
        console.log('Account profile saved successfully');
      },
      error: (error) => {
        console.error('Error saving account profile:', error);
        this.isSaving.set(false);
      }
    });
  }

  addCustomer() {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '600px',
      data: { customer: null, isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Generate a new customer ID
        const newCustomerId = this.accountModel().customers.length > 0
          ? Math.max(...this.accountModel().customers.map(c => c.customerId)) + 1
          : 1;

        const newCustomer: ICustomer = {
          ...result,
          customerId: newCustomerId
        };

        this.accountProfileService.addCustomer(newCustomer).subscribe({
          next: () => {
            this.loadAccountProfile();
          },
          error: (error) => {
            console.error('Error adding customer:', error);
          }
        });
      }
    });
  }

  editCustomer(customer: ICustomer) {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '600px',
      data: { customer: { ...customer }, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedCustomer: ICustomer = {
          ...result,
          customerId: customer.customerId
        };

        this.accountProfileService.updateCustomer(updatedCustomer).subscribe({
          next: () => {
            this.loadAccountProfile();
          },
          error: (error) => {
            console.error('Error updating customer:', error);
          }
        });
      }
    });
  }

  deleteCustomer(customer: ICustomer) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      data: { customerName: customer.businessName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.accountProfileService.deleteCustomer(customer.customerId).subscribe({
          next: () => {
            this.loadAccountProfile();
          },
          error: (error) => {
            console.error('Error deleting customer:', error);
          }
        });
      }
    });
  }
}
