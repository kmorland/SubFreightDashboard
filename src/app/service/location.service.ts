import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPartialAddress } from 'app/shared/interfaces/location';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  
  constructor(private http: HttpClient) {}

  getPartialAddress(searchStr: String): Observable<IPartialAddress[]> {
    return this.http.get<IPartialAddress[]>(`/api/location/partial-address/${searchStr}`);
  }



}
