import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, delay } from 'rxjs';
import { IAccountProfile } from 'app/shared/interfaces/account-profile';
import { ICustomer } from 'app/shared/interfaces/customer';

@Injectable({
  providedIn: 'root',
})
export class AccountProfileService {
  // Mock data for development - replace with HTTP calls in production
  private mockAccountProfile: IAccountProfile = {
    accountId: '12345',
    email: 'michael@abcelectric.com',
    company: {
      companyName: 'ABC Electric',
      contactName: 'Michael Vanderhook',
      address: {
        address: '123 Main Street',
        address2: 'Suite 100',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94102'
      }
    },
    customers: []
  };

  private accountProfileSubject = new BehaviorSubject<IAccountProfile>(this.mockAccountProfile);
  public accountProfile$ = this.accountProfileSubject.asObservable();

  constructor() {}

  /**
   * Get the current account profile
   * TODO: Replace with HTTP GET request to API endpoint
   * Example: return this.http.get<IAccountProfile>('/api/account-profile')
   */
  getAccountProfile(): Observable<IAccountProfile> {
    return of(this.accountProfileSubject.value).pipe(delay(100)); // Simulate API delay
  }

  /**
   * Update the account profile (company info)
   * TODO: Replace with HTTP PUT request to API endpoint
   * Example: return this.http.put<IAccountProfile>('/api/account-profile', accountProfile)
   */
  updateAccountProfile(accountProfile: IAccountProfile): Observable<IAccountProfile> {
    // Simulate API call
    this.accountProfileSubject.next(accountProfile);
    return of(accountProfile).pipe(delay(100));
  }

  /**
   * Add a new customer to the account
   * TODO: Replace with HTTP POST request to API endpoint
   * Example: return this.http.post<ICustomer>('/api/account-profile/customers', customer)
   */
  addCustomer(customer: ICustomer): Observable<ICustomer> {
    const currentProfile = this.accountProfileSubject.value;
    const updatedProfile = {
      ...currentProfile,
      customers: [...currentProfile.customers, customer]
    };
    this.accountProfileSubject.next(updatedProfile);
    return of(customer).pipe(delay(100));
  }

  /**
   * Update an existing customer
   * TODO: Replace with HTTP PUT request to API endpoint
   * Example: return this.http.put<ICustomer>(`/api/account-profile/customers/${customer.customerId}`, customer)
   */
  updateCustomer(customer: ICustomer): Observable<ICustomer> {
    const currentProfile = this.accountProfileSubject.value;
    const updatedCustomers = currentProfile.customers.map(c =>
      c.customerId === customer.customerId ? customer : c
    );
    const updatedProfile = {
      ...currentProfile,
      customers: updatedCustomers
    };
    this.accountProfileSubject.next(updatedProfile);
    return of(customer).pipe(delay(100));
  }

  /**
   * Delete a customer
   * TODO: Replace with HTTP DELETE request to API endpoint
   * Example: return this.http.delete<void>(`/api/account-profile/customers/${customerId}`)
   */
  deleteCustomer(customerId: number): Observable<void> {
    const currentProfile = this.accountProfileSubject.value;
    const updatedCustomers = currentProfile.customers.filter(c => c.customerId !== customerId);
    const updatedProfile = {
      ...currentProfile,
      customers: updatedCustomers
    };
    this.accountProfileSubject.next(updatedProfile);
    return of(void 0).pipe(delay(100));
  }
}
