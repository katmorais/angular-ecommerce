import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  private urlRelatorio = 'http://localhost:8080/camisetas/relatorio';

  constructor(private http: HttpClient) {}

  getRelatorio(): Observable<Blob> {
    const params = {
      nome: ""
    }
    return this.http.get(this.urlRelatorio,{ params, responseType: 'blob' });
  }


}
