import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cartao } from '../models/cartao.model';



@Injectable({
  providedIn: 'root'
})
export class CartaoService {
  private baseUrl = 'http://localhost:8080/cartoes';

  constructor(private httpClient: HttpClient) {  }
  
  findAll(page?: number, pageSize?: number): Observable<Cartao[]> {
    let params = {}
    if(page !== undefined && pageSize !== undefined){
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }
    return this.httpClient.get<Cartao[]>(`${this.baseUrl}`, {params});
  }

  count(): Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findByNome(nome: string): Observable<Cartao[]> {
    return this.httpClient.get<Cartao[]>(`${this.baseUrl}/search/nome/${nome}`);
  }

  findByCartao(cartao: string): Observable<Cartao[]> {
    return this.httpClient.get<Cartao[]>(`${this.baseUrl}/search/cartao/${cartao}`);
  }

  findById(id: string): Observable<Cartao> {
    return this.httpClient.get<Cartao>(`${this.baseUrl}/${id}`);
  }

  insert(cartao: Cartao): Observable<Cartao> {
    return this.httpClient.post<Cartao>(this.baseUrl, cartao);
  }
  
  update(cartao: Cartao): Observable<Cartao> {
    return this.httpClient.put<Cartao>(`${this.baseUrl}/${cartao.id}`, cartao);
  }

  delete(cartao: Cartao): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${cartao.id}`);
  }
}
