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
import { Transportadora } from '../../../../models/transportadora';
import { TransportadoraService } from '../../../../services/transportadora.service';
import { ConfirmationDialogComponent } from '../../../confirmation/confirmation-dialog.component';
import { Subscription } from 'rxjs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ViewTransportadoraComponent } from '../view/view.component';
import { SidebarComponent } from '../../../template/sidebar/sidebar.component';


@Component({
  selector: 'app-transportadora-list',
  standalone: true,
  imports: [MatTableModule, MatToolbarModule, MatIconModule,MatPaginatorModule, SidebarComponent
  , MatButtonModule, RouterModule, MatCardModule,  MatMenuModule, MatSidenavModule, MatListModule],
  templateUrl: './transportadora-list.component.html',
  styleUrl: './transportadora-list.component.css'
})
export class TransportadoraListComponent implements OnInit {
  displayedColumns: string[] = ['id','nome', 'capacidade', 'tarifa', 'acao'];

  transportadoras: Transportadora[] = [];
  transportadoraSubscription: Subscription | undefined;

  totalRecords = 0;
  pageSize = 2;
  page = 0;
  searchText: string = '';
  administradoresSubscription: Subscription | undefined;

  constructor(private dialog: MatDialog,
    private transportadoraService: TransportadoraService) { }

  ngOnInit(): void {
    this.transportadoraService.findAll(this.page, this.pageSize).subscribe(data => {
      this.transportadoras = data;
      console.log(this.transportadoras);
    });

    this.transportadoraService.count().subscribe(data => {
      this.totalRecords = data;
      console.log(this.transportadoras);
    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  //Verifica se this.administradoresSubscription existe e não é nulo.
  ngOnDestroy(): void {
    if (this.transportadoraSubscription) {
      this.transportadoraSubscription.unsubscribe();
    }
  }

  search() {
    // Se o texto de busca estiver vazio, busque todos os administradores
    if (!this.searchText.trim()) {
      this.transportadoraService.findAll().subscribe(
        data => {
          this.transportadoras = data;
        },
        error => {
          console.error('Erro ao buscar administradores:', error);
        }
      );
      return;
    }
    // Converter searchText para minúsculas para busca insensível a maiúsculas e minúsculas
    const termoDeBusca = this.searchText.toLowerCase();
    this.transportadoraService.findByNome(termoDeBusca).subscribe(
      data => {
        this.transportadoras = data;
      },
      error => {
        console.error('Erro ao buscar por nome:', error);
      }
    );
  }

  //Caixa de dialogo para excluir
  confirmDelete(transportadora: Transportadora): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true && transportadora && transportadora.id !== undefined) {

        this.transportadoraService.delete(transportadora).subscribe(
          () => {
            // Atualizar lista de administradores após exclusão
            this.transportadoras = this.transportadoras.filter(adm => adm.id !== transportadora.id);
          }
        );
      }
    });
  }

  visualizarDados(transportadora: Transportadora): void {
    this.dialog.open(ViewTransportadoraComponent, {
      data: transportadora
    });
  }

}
