import { Component, OnInit } from '@angular/core';

import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { CamisetaService } from '../../../../services/camiseta.service';
import { ConfirmationDialogComponent } from '../../../confirmation/confirmation-dialog.component';
import { Subscription } from 'rxjs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ViewCamisetaComponent } from '../view/view.component';
import { Camiseta } from '../../../../models/camiseta.model';
import { SidebarComponent } from '../../../template/sidebar/sidebar.component';


@Component({
  selector: 'app-camiseta-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule, MatPaginatorModule, SidebarComponent,
    MatButtonModule, RouterModule, MatCardModule, MatMenuModule, MatSidenavModule, MatListModule],
  templateUrl: './camiseta-list.component.html',
  styleUrl: './camiseta-list.component.css'
})
export class CamisetaListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'descricao', 'estoque', 'preco', 'estampa', 'tecido', 'fornecedor', 'tipoCamiseta', 'marca', 'cor', 'acao'];

  camisetas: Camiseta[] = [];
  camisetaSubscription: Subscription | undefined;

  totalRecords = 0;
  pageSize = 2;
  page = 0;
  searchText: string = '';
  administradoresSubscription: Subscription | undefined;

  constructor(private dialog: MatDialog,
    private camisetaService: CamisetaService) { }

  ngOnInit(): void {
    this.camisetaService.findAll(this.page, this.pageSize).subscribe(data => {
      this.camisetas = data;
      console.log(this.camisetas);
    });

    this.camisetaService.count().subscribe(data => {
      this.totalRecords = data;
      console.log(this.camisetas);
    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  //Verifica se this.administradoresSubscription existe e não é nulo.
  ngOnDestroy(): void {
    if (this.camisetaSubscription) {
      this.camisetaSubscription.unsubscribe();
    }
  }

  search() {
    // Se o texto de busca estiver vazio, busque todos os administradores
    if (!this.searchText.trim()) {
      this.camisetaService.findAll().subscribe(
        data => {
          this.camisetas = data;
        },
        error => {
          console.error('Erro ao buscar administradores:', error);
        }
      );
      return;
    }
    // Converter searchText para minúsculas para busca insensível a maiúsculas e minúsculas
    const termoDeBusca = this.searchText.toLowerCase();
    this.camisetaService.findByNome(termoDeBusca).subscribe(
      data => {
        this.camisetas = data;
      },
      error => {
        console.error('Erro ao buscar por nome:', error);
      }
    );
  }

  //Caixa de dialogo para excluir
  confirmDelete(camiseta: Camiseta): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true && camiseta && camiseta.id !== undefined) {

        this.camisetaService.delete(camiseta).subscribe(
          () => {
            // Atualizar lista de administradores após exclusão
            this.camisetas = this.camisetas.filter(adm => adm.id !== camiseta.id);
          }
        );
      }
    });
  }

  visualizarDados(camiseta: Camiseta): void {
    this.dialog.open(ViewCamisetaComponent, {
      data: camiseta
    });
  }

}
