import {Component, OnInit, signal} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardTitle} from '@angular/material/card';

import {MatSnackBar} from '@angular/material/snack-bar';

import {NgFor} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {Camiseta} from '../../../models/camiseta.model';
import {CamisetaService} from '../../../services/camiseta.service';
import {CarrinhoService} from '../../../services/carrinho.service';
import {CarroselComponent} from "../carrosel/carrosel.component";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatPaginator} from "@angular/material/paginator";
import {LocalStorageService} from "../../../services/local-storage.service";
import {ActivatedRoute, Router} from "@angular/router";

// tipo personalizado de dados, como classes e interfaces, porém mais simples.
type Card = {
  idCamiseta: number;
  titulo: string;
  preco: number;
  urlImagem: string;
}

@Component({
  selector: 'app-camiseta-card-list',
  standalone: true,
  imports: [MatCard, MatCardActions, MatCardContent, MatCardTitle, MatCardFooter, NgFor, MatButton, CarroselComponent, MatFormField, MatInput, MatOption, MatSelect, MatPaginator],
  templateUrl: './camiseta-card-list.component.html',
  styleUrl: './camiseta-card-list.component.css'
})
export class CamisetaCardListComponent implements OnInit {

  cards = signal<Card[]>([]);
  camisetas: Camiseta[] = [];

  constructor(private camisetaService: CamisetaService,
              private carrinhoService: CarrinhoService,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.carregarCamisetas(params['categoria']));
  }

  carregarCamisetas(categoria?: string) {
    this.camisetaService.findAll(0, 10, categoria).subscribe(data => {
      this.camisetas = data;
      this.carregarCards();
    });
  }

  carregarCards() {
    const cards: Card[] = [];
    this.camisetas.forEach(camiseta => {
      cards.push({
        idCamiseta: camiseta.id,
        titulo: camiseta.nome,
        preco: camiseta.preco,
        urlImagem: this.camisetaService.getUrlImagem(camiseta.nomeImagem)
      });
    });
    this.cards.set(cards);
  }

  adicionarAoCarrinho(card: Card) {
    this.showSnackbarTopPosition('Produto adicionado ao carrinho!', 'Fechar');
    this.carrinhoService.adicionar({
      id: card.idCamiseta,
      nome: card.titulo,
      preco: card.preco,
      quantidade: 1
    })

  }

  showSnackbarTopPosition(content: any, action: any) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }

  onClickVerMais(idCamiseta: any) {
    this.router.navigateByUrl(`/camiseta/${idCamiseta}`);
  }
}
