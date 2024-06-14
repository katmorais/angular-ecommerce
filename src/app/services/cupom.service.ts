import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cupom } from '../models/cupom.model';

@Injectable({
  providedIn: 'root',
})
export class CupomService {
  private baseUrl = 'http://localhost:8080/cupons';

  constructor(private httpClient: HttpClient) {}

  findAll(page?: number, pageSize?: number): Observable<Cupom[]> {
    let params = {};
    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString(),
      };
    }
    return this.httpClient.get<Cupom[]>(`${this.baseUrl}`, { params });
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findByNome(nome: string): Observable<Cupom[]> {
    return this.httpClient.get<Cupom[]>(`${this.baseUrl}/search/nome/${nome}`);
  }

  findByCupom(cupom: string): Observable<Cupom[]> {
    return this.httpClient.get<Cupom[]>(
      `${this.baseUrl}/search/${cupom}`
    );
  }

  findById(id: string): Observable<Cupom> {
    return this.httpClient.get<Cupom>(`${this.baseUrl}/${id}`);
  }

  insert(cupom: Cupom): Observable<Cupom> {
    const data = {
      codigo: cupom.codigo,
      valorDesconto: cupom.valorDesconto,
      validade: cupom.validade,
    };
    return this.httpClient.post<Cupom>(this.baseUrl, cupom);
  }

  update(cupom: Cupom): Observable<Cupom> {
    const data = {
      codigo: cupom.codigo,
      valorDesconto: cupom.valorDesconto,
      validade: cupom.validade,
    };
    return this.httpClient.put<Cupom>(`${this.baseUrl}/${cupom.id}`, data);
  }

  delete(cupom: Cupom): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${cupom.id}`);
  }
}
