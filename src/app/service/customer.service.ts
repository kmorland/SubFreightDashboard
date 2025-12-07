import { Injectable } from '@angular/core';
import { ICustomer } from 'app/shared/interfaces/customer';
import { map, Observable, of } from 'rxjs';
import customerJson from 'app/shared/data/customers.json';


@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customers: ICustomer[] = customerJson;

  constructor() {

  }

  searchForCustomers(value: string): Observable<ICustomer[]> {
    return this.getCustomers().pipe(
      map(customers => customers.filter(cust => cust.businessName.toLowerCase().includes(value.toLowerCase())))
    );
  }

  private getCustomers(): Observable<ICustomer[]> {
    return of(this.customers);
  }
}
