import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {MatBadge} from '@angular/material/badge';
import {AuthService} from '../../../services/auth.service';
import {LocalStorageService} from '../../../services/local-storage.service';

import {CarrinhoService} from '../../../services/carrinho.service';
import {Subscription} from 'rxjs';
import {MatButton, MatIconButton} from '@angular/material/button';
import {Router, RouterModule} from '@angular/router';
import {SidebarService} from '../../../services/sidebar.service';
import {AsyncPipe, JsonPipe, NgFor, NgIf} from "@angular/common";
import {MatListItem, MatNavList} from "@angular/material/list";
import {SexoEnum} from "../../../models/sexo.enum";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TipoCamiseta} from "../../../models/tipocamiseta.model";
import {TipoCamisetaService} from "../../../services/tipoCamiseta.service";
import {getRoleFromToken} from "./role";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, NgFor, MatToolbar, MatIcon, MatBadge, MatButton, MatIconButton, RouterModule, JsonPipe, MatNavList, MatListItem, MatMenuTrigger, MatMenu, MatMenuItem, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  usuarioLogado: any = null;
  categorias: TipoCamiseta[] = []
  private subscription = new Subscription();

  qtdItensCarrinho: number = 0;

  constructor(private sidebarService: SidebarService,
              private carrinhoService: CarrinhoService,
              private authService: AuthService,
              private router: Router,
              private tipoCamisetaService: TipoCamisetaService,
              private localStorageService: LocalStorageService) {

  }

  ngOnInit(): void {
    this.obterQtdItensCarrinho();
    this.obterUsuarioLogado();
    this.obterTipoCamisetas();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private obterTipoCamisetas() {
    this.tipoCamisetaService.findAll().subscribe(tiposCamiseta => this.categorias = tiposCamiseta);
  }

  clickMenu() {
    this.sidebarService.toggle();
  }

  obterQtdItensCarrinho() {
    this.carrinhoService.carrinho$.subscribe(itens => {
      this.qtdItensCarrinho = itens.length
    });
  }

  obterUsuarioLogado() {
    this.subscription.add(this.authService.getUsuarioLogado().subscribe(
      usuario => this.usuarioLogado = usuario
    ));
  }

  deslogar() {
    this.authService.removeToken()
    this.authService.removeUsuarioLogado();
    this.router.navigate(['/produtos']);
  }

  logar() {
    this.router.navigate(['/login']);
  }

  filtrarCategoria(categoria: string) {
    this.router.navigate(['/produtos'], {queryParams: {categoria}});
  }

  onClickUsuario() {
    const token = this.localStorageService.getToken();
    if (token && getRoleFromToken(token) === 'Administrador') {
      this.router.navigateByUrl('admin/camisetas/list');
    } else {
      this.router.navigate([`/usuario/${this.usuarioLogado.id}`]);
    }
  }
}
