import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root',
})
export class QuoteService {

  constructor(private http: HttpClient) {}

  createQuote(data: any) {
    return this.http.post('/api/quote/create', data);
  }

  

}
