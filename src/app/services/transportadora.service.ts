import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transportadora } from '../models/transportadora';


@Injectable({
  providedIn: 'root'
})
export class TransportadoraService {
  private baseUrl = 'http://localhost:8080/transportadoras';

  constructor(private httpClient: HttpClient) {  }
  
  findAll(page?: number, pageSize?: number): Observable<Transportadora[]> {
    let params = {}
    if(page !== undefined && pageSize !== undefined){
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }
    return this.httpClient.get<Transportadora[]>(`${this.baseUrl}`, {params});
  }

  count(): Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findByNome(nome: string): Observable<Transportadora[]> {
    return this.httpClient.get<Transportadora[]>(`${this.baseUrl}/search/nome/${nome}`);
  }

  findByTransportadora(transportadora: string): Observable<Transportadora[]> {
    return this.httpClient.get<Transportadora[]>(`${this.baseUrl}/search/transportadora/${transportadora}`);
  }

  findById(id: string): Observable<Transportadora> {
    return this.httpClient.get<Transportadora>(`${this.baseUrl}/${id}`);
  }

  insert(transportadora: Transportadora): Observable<Transportadora> {
    return this.httpClient.post<Transportadora>(this.baseUrl, transportadora);
  }
  
  update(transportadora: Transportadora): Observable<Transportadora> {
    return this.httpClient.put<Transportadora>(`${this.baseUrl}/${transportadora.id}`, transportadora);
  }

  delete(transportadora: Transportadora): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${transportadora.id}`);
  }
}
