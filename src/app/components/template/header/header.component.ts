import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {MatBadge} from '@angular/material/badge';
import {Usuario} from '../../../models/usuario.model';
import {AuthService} from '../../../services/auth.service';
import {LocalStorageService} from '../../../services/local-storage.service';

import {CarrinhoService} from '../../../services/carrinho.service';
import {Subscription} from 'rxjs';
import {MatButton, MatIconButton} from '@angular/material/button';
import {Router, RouterModule} from '@angular/router';
import {SidebarService} from '../../../services/sidebar.service';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, MatToolbar, MatIcon, MatBadge, MatButton, MatIconButton, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  usuarioLogado: Usuario | null = null;
  private subscription = new Subscription();

  qtdItensCarrinho: number = 0;

  constructor(private sidebarService: SidebarService,
              private carrinhoService: CarrinhoService,
              private authService: AuthService,
              private router: Router,
              private localStorageService: LocalStorageService) {

  }

  ngOnInit(): void {
    this.obterQtdItensCarrinho();
    this.obterUsuarioLogado();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
}
