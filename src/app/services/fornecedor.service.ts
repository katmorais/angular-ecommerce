import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fornecedor } from '../models/fornecedor.model';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  private baseUrl = 'http://localhost:8080/fornecedores';
  
  constructor(private httpClient: HttpClient) {  }
  
  findAll(page?: number, pageSize?: number): Observable<Fornecedor[]> {
    let params = {}

    if(page !== undefined && pageSize !== undefined){
        params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }
    return this.httpClient.get<Fornecedor[]>(`${this.baseUrl}`, {params});
  }

  count(): Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findByNome(nome: string): Observable<Fornecedor[]> {
    return this.httpClient.get<Fornecedor[]>(`${this.baseUrl}/search/nome/${nome}`);
  }

  findByFornecedor(fornecedor: string): Observable<Fornecedor[]> {
    return this.httpClient.get<Fornecedor[]>(`${this.baseUrl}/search/fornecedor/${fornecedor}`);
  }

  findById(id: string): Observable<Fornecedor> {
    return this.httpClient.get<Fornecedor>(`${this.baseUrl}/${id}`);
  }

  insert(fornecedor: Fornecedor): Observable<Fornecedor> {
    const data = {
      nome: fornecedor.nome,
      
    }
    return this.httpClient.post<Fornecedor>(this.baseUrl, fornecedor);
  }
  
  update(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.httpClient.put<Fornecedor>(`${this.baseUrl}/${fornecedor.id}`, fornecedor);
  }

  delete(fornecedor: Fornecedor): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${fornecedor.id}`);
  }
}
