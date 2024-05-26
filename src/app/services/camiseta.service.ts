import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Camiseta } from '../models/camiseta.model';
import { TipoCamiseta } from '../models/tipocamiseta.model';
import { Tamanho } from '../models/tamanho.model';


@Injectable({
  providedIn: 'root'
})
export class CamisetaService {
  private baseUrl = 'http://localhost:8080/camisetas';

  constructor(private httpClient: HttpClient) {  }

  findAll(page?: number, pageSize?: number): Observable<Camiseta[]> {
    let params = {}
    if(page !== undefined && pageSize !== undefined){
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }
    return this.httpClient.get<Camiseta[]>(`${this.baseUrl}`, {params});
  }

  count(): Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findByNome(nome: string): Observable<Camiseta[]> {
    return this.httpClient.get<Camiseta[]>(`${this.baseUrl}/search/nome/${nome}`);
  }

  findByCamiseta(camiseta: string): Observable<Camiseta[]> {
    return this.httpClient.get<Camiseta[]>(`${this.baseUrl}/search/camiseta/${camiseta}`);
  }

  findById(id: string): Observable<Camiseta> {
    return this.httpClient.get<Camiseta>(`${this.baseUrl}/${id}`);
  }

  insert(camiseta: Camiseta): Observable<Camiseta> {
    const data = {
      nome: camiseta.nome,
      descricao: camiseta.descricao,
      estoque: camiseta.estoque,
      preco: camiseta.preco,
      estampa: camiseta.estampa,
      tecido: camiseta.tecido,
      idTamanho: camiseta.tamanho.id,
      idFornecedor: camiseta.fornecedor.id,
      idTipoCamiseta: camiseta.tipoCamiseta.id,
      idMarca: camiseta.marca.id,
      cor: camiseta.cor
    }
    return this.httpClient.post<Camiseta>(this.baseUrl, data);
  }

  update(camiseta: Camiseta): Observable<Camiseta> {
    const data = {
      nome: camiseta.nome,
      descricao: camiseta.descricao,
      estoque: camiseta.estoque,
      preco: camiseta.preco,
      estampa: camiseta.estampa,
      tecido: camiseta.tecido,
      idTamanho: camiseta.tamanho.id,
      idFornecedor: camiseta.fornecedor.id,
      idTipoCamiseta: camiseta.tipoCamiseta.id,
      idMarca: camiseta.marca.id,
      cor: camiseta.cor
    };
    return this.httpClient.put<Camiseta>(`${this.baseUrl}/${camiseta.id}`, data);
  }


  delete(camiseta: Camiseta): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${camiseta.id}`);
  }

  getTamanho(): Observable<Tamanho[]> {
    return this.httpClient.get<Tamanho[]>(`${this.baseUrl}/tamanho`);
  }

}
