import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  sexoSubject = new Subject<number>();
  sexoObservable = this.sexoSubject.asObservable();

  constructor() { }

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  setFiltroSexo(sexo: number) {
    if (sexo) {
      localStorage.setItem("sexo", sexo.toString());
    } else {
      localStorage.removeItem("sexo");
    }

    this.sexoSubject.next(sexo);
  }
}
