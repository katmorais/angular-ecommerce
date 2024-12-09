import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CamisetaService} from "../../../services/camiseta.service";
import {Camiseta} from "../../../models/camiseta.model";
import {NgIf} from "@angular/common";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {TamanhoEnum} from "../../../models/tamanho.enum";
import {Tamanho} from "../../../models/tamanho.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CarrinhoService} from "../../../services/carrinho.service";

@Component({
  selector: 'app-camiseta-detalhe',
  templateUrl: './camiseta-detalhe.component.html',
  standalone: true,
  imports: [
    NgIf,
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatCardImage,
    MatCardActions,
    MatCardTitle,
    MatButton
  ],
  styleUrls: ['./camiseta-detalhe.component.css']
})
export class CamisetaDetalheComponent implements OnInit {
  camiseta = new Camiseta();
  imagemUrl = '';

  constructor(private route: ActivatedRoute,
              private camisetaService: CamisetaService,
              private snackBar: MatSnackBar,
              private carrinhoService: CarrinhoService,
              private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.camisetaService.findById(id).subscribe(data => {
        this.camiseta = data;
        this.camiseta.tamanho = this.getTamanho(this.camiseta.tamanho);
        this.imagemUrl = this.camisetaService.getUrlImagem(this.camiseta.nomeImagem)
      });
    } else {
      console.error('Id da camiseta não informado');
    }
  }

  private getTamanho(tamanho: Tamanho): Tamanho {
    tamanho.label = Object.keys(TamanhoEnum).find((key: string) => TamanhoEnum[key as keyof typeof TamanhoEnum] == tamanho.id) ?? '';
    return tamanho;
  }

  adicionarAoCarrinho() {
    this.showSnackbarTopPosition('Produto adicionado ao carrinho!', 'Fechar');
    this.carrinhoService.adicionar({
      id: this.camiseta.id,
      nome: this.camiseta.nome,
      preco: this.camiseta.preco,
      quantidade: 1
    });
    this.router.navigate(['/carrinho']);
  }

  showSnackbarTopPosition(content: any, action: any) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }
}
