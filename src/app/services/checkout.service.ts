import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Checkout} from "../models/checkout.model";


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private baseUrl = 'http://localhost:8080/checkout';

  constructor(private httpClient: HttpClient) {  }

  findById(id: string): Observable<Checkout> {
    return this.httpClient.get<Checkout>(`${this.baseUrl}/${id}`);
  }

  insert(checkout: {}): Observable<Checkout> {
    return this.httpClient.post<Checkout>(this.baseUrl, checkout);
  }
}
