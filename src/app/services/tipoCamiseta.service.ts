import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoCamiseta } from '../models/tipocamiseta.model';

@Injectable({
    providedIn: 'root'
})
export class TipoCamisetaService {
    private baseUrl = 'http://localhost:8080/tipocamisetas';

    constructor(private httpClient: HttpClient) { }

    findAll(page?: number, pageSize?: number): Observable<TipoCamiseta[]> {
        let params = {}

        if (page !== undefined && pageSize !== undefined) {
            params = {
                page: page.toString(),
                pageSize: pageSize.toString()
            }
        }
        return this.httpClient.get<TipoCamiseta[]>(`${this.baseUrl}`, { params });
    }

    count(): Observable<number> {
        return this.httpClient.get<number>(`${this.baseUrl}/count`);
    }

    findByNome(nome: string): Observable<TipoCamiseta[]> {
        return this.httpClient.get<TipoCamiseta[]>(`${this.baseUrl}/search/nome/${nome}`);
    }

    findByTipoCamiseta(tipocamiseta: string): Observable<TipoCamiseta[]> {
        return this.httpClient.get<TipoCamiseta[]>(`${this.baseUrl}/search/tipocamisetas/${tipocamiseta}`);
    }

    findById(id: string): Observable<TipoCamiseta> {
        return this.httpClient.get<TipoCamiseta>(`${this.baseUrl}/${id}`);
    }

    insert(tipocamiseta: TipoCamiseta): Observable<TipoCamiseta> {
        const data = {
            nome: tipocamiseta.nome,

        }
        return this.httpClient.post<TipoCamiseta>(this.baseUrl, tipocamiseta);
    }

    update(tipocamiseta: TipoCamiseta): Observable<TipoCamiseta> {
        const data = {
            nome: tipocamiseta.nome,
        }
        return this.httpClient.put<TipoCamiseta>(`${this.baseUrl}/${tipocamiseta.id}`, tipocamiseta);
    }

    delete(tipocamiseta: TipoCamiseta): Observable<any> {
        return this.httpClient.delete<any>(`${this.baseUrl}/${tipocamiseta.id}`);
    }
}
