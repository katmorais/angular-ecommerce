import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Camiseta} from '../models/camiseta.model';


@Injectable({
  providedIn: 'root'
})
export class CamisetaService {
  private baseUrl = 'http://localhost:8080/camisetas';

  constructor(private httpClient: HttpClient) {
  }

  findAll(page?: number, pageSize?: number, categoria?: string): Observable<Camiseta[]> {
    let params = {}
    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString(),
        categoria: categoria?.toString() ?? ''
      }
    }
    return this.httpClient.get<Camiseta[]>(`${this.baseUrl}`, {params});
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findByNome(nome: string): Observable<Camiseta[]> {
    return this.httpClient.get<Camiseta[]>(`${this.baseUrl}/search/nome/${nome}`);
  }
  countByNome(nome: string): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/search/${nome}/count`);
  }

  getUrlImagem(nomeImagem: string): string {
    return `${this.baseUrl}/image/download/${nomeImagem}`;
  }

  uploadImagem(id: number, nomeImagem: string, imagem: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('id', id.toString());
    formData.append('nomeImagem', imagem.name);
    formData.append('imagem', imagem, imagem.name);

    return this.httpClient.patch<Camiseta>(`${this.baseUrl}/image/upload`, formData);
  }

  save(camiseta: Camiseta): Observable<Camiseta> {
    return this.httpClient.post<Camiseta>(`${this.baseUrl}`, camiseta);
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
      idFornecedor: camiseta.fornecedor.id,
      idTipoCamiseta: camiseta.tipoCamiseta.id,
      idMarca: camiseta.marca.id,
      cor: camiseta.cores,
      tamanho: camiseta.tamanho
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
      idFornecedor: camiseta.fornecedor.id,
      idTipoCamiseta: camiseta.tipoCamiseta.id,
      idMarca: camiseta.marca.id,
      cor: camiseta.cores
    };
    return this.httpClient.put<Camiseta>(`${this.baseUrl}/${camiseta.id}`, data);
  }


  delete(camiseta: Camiseta): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${camiseta.id}`);
  }
  generatePdfReports(filter: string): Observable<Blob> {
    const url = `${this.baseUrl}/relatorios?filter=${filter}`;
    const headers = new HttpHeaders({
      'Content-Disposition': 'application/pdf',
    });

    return this.httpClient.get(url, { responseType: 'blob', headers });
  }

  findByNomeContaining(filtro: string) {
    return this.httpClient.get<Camiseta[]>(`${this.baseUrl}/search/nome/${filtro}`);

  }
}
