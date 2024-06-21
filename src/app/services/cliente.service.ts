import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ClienteModel} from "../models/clienteModel";
import {Checkout} from "../models/checkout.model";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl = 'http://localhost:8080/cliente';

  constructor(private http: HttpClient) {
  }

  findById(id: number): Observable<ClienteModel> {
    return this.http.get<ClienteModel>(`${this.baseUrl}/${id}`);
  }

  findComprasByClienteId(id: number) {
    return this.http.get<Checkout[]>(`${this.baseUrl}/${id}/compras`);
  }
}
