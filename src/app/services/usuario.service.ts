import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteModel } from '../models/clienteModel';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = 'http://localhost:8080/cliente';

  addCartoesToUsuario(usuarioId: string, cartoes: any[]): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/${usuarioId}/cartoes`, cartoes)
  }

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<ClienteModel[]> {
    return this.httpClient.get<ClienteModel[]>(this.baseUrl);
  }

  findById(id: string): Observable<ClienteModel> {
    return this.httpClient.get<ClienteModel>(`${this.baseUrl}/${id}`);
  }

  insert(cliente: ClienteModel): Observable<ClienteModel> {
    return this.httpClient.post<ClienteModel>(this.baseUrl, cliente);
  }

  update(cliente: ClienteModel): Observable<ClienteModel> {
    return this.httpClient.put<ClienteModel>(`${this.baseUrl}/${cliente.id}`, cliente);
  }

  delete(usuario: ClienteModel): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${usuario.id}`);
  }

}
