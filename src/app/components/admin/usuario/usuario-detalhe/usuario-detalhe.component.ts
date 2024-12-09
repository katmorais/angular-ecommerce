import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgForOf, NgIf} from "@angular/common";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {ClienteService} from "../../../../services/cliente.service";
import {ClienteModel} from "../../../../models/clienteModel";
import {Checkout} from "../../../../models/checkout.model";
import {ItemCarrinho} from "../../../../models/itemcarrinho.model";

@Component({
  selector: 'app-usuario-detalhe',
  templateUrl: './usuario-detalhe.component.html',
  standalone: true,
  imports: [
    NgIf,
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatCardImage,
    MatCardActions,
    MatCardTitle,
    MatButton,
    NgForOf
  ],
  styleUrls: ['./usuario-detalhe.component.css']
})
export class UsuarioDetalheComponent implements OnInit {

  cliente = new ClienteModel();
  compras: Checkout[] = [];

  constructor(private route: ActivatedRoute, private clienteService: ClienteService) {
  }

  ngOnInit(): void {
    this.getClienteDetalhes();
  }

  getClienteDetalhes(): void {
    const id = +(this.route.snapshot.paramMap.get('id') ?? 0);
    this.clienteService.findById(id)
      .subscribe(cliente => {
        this.cliente = cliente;
        this.clienteService.findComprasByClienteId(id).subscribe(compras => {
          this.compras = compras;
        });
      });
  }

  getValor(itens: ItemCarrinho[]) {
    return itens.map(item => item.preco * item.quantidade).reduce((a, b) => a + b, 0).toFixed(2);
  }

  getCamisa(itens: ItemCarrinho[]) {
    return itens.map(item => `${item.nome} | ${item.preco} | ${item.quantidade}`).join(', ');
  }
}
