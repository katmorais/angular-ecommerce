import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { ItemCarrinho } from '../models/itemcarrinho.model';
import {Cupom} from "../models/cupom.model";

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private carrinhoSubject = new BehaviorSubject<ItemCarrinho[]>([]);
  carrinho$ = this.carrinhoSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const carrinhoArmazenado = localStorageService.getItem('carrinho') || [];
    this.carrinhoSubject.next(carrinhoArmazenado);
  }

  adicionar(consulta: ItemCarrinho): void {
    const carrinhoAtual = this.carrinhoSubject.value;
    const itemExistente = carrinhoAtual.find((item) => item.id === consulta.id);

    if (itemExistente) {
      itemExistente.quantidade += consulta.quantidade || 1;
    } else {
      carrinhoAtual.push({ ...consulta });
    }

    this.carrinhoSubject.next(carrinhoAtual);
    this.atualizarArmazenamentoLocal();
  }

  removerTudo(): void {
    this.localStorageService.removeItem('carrinho');
    this.carrinhoSubject.next([]);
  }

  remover(item: ItemCarrinho): void {
    const carrinhoAtual = this.carrinhoSubject.value;
    const carrinhoAtualizado = carrinhoAtual.filter(
      (itemCarrinho) => itemCarrinho !== item
    );

    this.carrinhoSubject.next(carrinhoAtualizado);
    this.atualizarArmazenamentoLocal();
  }

  obter(): ItemCarrinho[] {
    return this.carrinhoSubject.value;
  }

  obterCupom(): Cupom {
    return this.localStorageService.getItem('cupom');
  }

  private atualizarArmazenamentoLocal(): void {
    localStorage.setItem(
      'carrinho',
      JSON.stringify(this.carrinhoSubject.value)
    );
  }

  obterValorTotal() {
    if (this.obterCupom()) {
      return this.obter().reduce((acc, item) => acc + item.preco, 0) - this.obterCupom().valorDesconto;
    }
    return this.obter().reduce((acc, item) => acc + item.preco, 0);
  }

  aplicarCupom(cupom: Cupom) {
    localStorage.setItem(
      'cupom',
      JSON.stringify(cupom)
    );
  }

  removerCupom() {
    localStorage.removeItem('cupom');
  }
}
