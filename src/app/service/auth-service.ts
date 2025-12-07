import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  get getCurrentUser() {
    return {
      accountId: 1234,
      email: 'kmorland1230@gmail.com',
      company: {
        companyName: 'ABC Eletric',
        contactName: 'Michael Vanderhook',
        address: '7914 Ajay Dr',
        address2: '',
        city: 'Sun Valley',
        state: 'CA',
        postalCode: '91352',
      },
      roles: [],
    }
  }
}
