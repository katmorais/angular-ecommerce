import {NgFor, NgIf} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ItemCarrinho} from '../../../models/itemcarrinho.model';
import {CarrinhoService} from '../../../services/carrinho.service';
import {Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [NgFor, NgIf, MatIcon],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css',
})
export class CarrinhoComponent implements OnInit {
  carrinhoItens: ItemCarrinho[] = [];

  constructor(private carrinhoService: CarrinhoService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe((itens) => {
      this.carrinhoItens = itens;
    });
  }

  finalizarCompra(): void {
    this.router.navigate(['/checkout']);
  }

  calcularTotal(): number {
    // Inicializa o total com zero
    let total = 0;

    // Itera pelos itens do carrinho para calcular o total
    this.carrinhoItens.forEach(item => {
      total += item.quantidade * item.preco;
    });

    return total;
  }

  aumentarQuantidade(item: ItemCarrinho): void {
    this.carrinhoService.aumentarQuantidade(item);
  }

  diminuirQuantidade(item: ItemCarrinho): void {
    this.carrinhoService.diminuirQuantidade(item);

    // Verifica se a quantidade do item chegou a zero para removê-lo do carrinho
    if (item.quantidade === 0) {
      this.removerItem(item);
    }
  }

  removerItem(item: ItemCarrinho): void {
    this.carrinhoService.removerItem(item);
  }


}
