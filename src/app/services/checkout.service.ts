import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Checkout} from "../models/checkout.model";
import {ItemCarrinho} from "../models/itemcarrinho.model";


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private baseUrl = 'http://localhost:8080/checkout';

  constructor(private httpClient: HttpClient) {
  }

  findById(id: string): Observable<Checkout> {
    return this.httpClient.get<Checkout>(`${this.baseUrl}/${id}`);
  }

  insert(checkout: {}, itens: ItemCarrinho[], idCliente: any): Observable<Checkout> {
    const body = {...checkout, itens: itens, idCliente}
    return this.httpClient.post<Checkout>(this.baseUrl, body);
  }
}
