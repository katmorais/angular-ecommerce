import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSidenav } from '@angular/material/sidenav';
import { MatCard } from '@angular/material/card';
import { TipoCamiseta } from '../../../../models/tipocamiseta.model';
import { ConfirmationDialogComponent } from '../../../confirmation/confirmation-dialog.component';
import { TipoCamisetaService } from '../../../../services/tipoCamiseta.service';
import { ViewTipoCamisetaComponent } from '../view/view.component';
import { SidebarComponent } from '../../../template/sidebar/sidebar.component';

@Component({
  selector: 'app-tipocamisetas-list',
  standalone: true,
  templateUrl: './tipoCamiseta-list.component.html',
  styleUrl: './tipoCamiseta-list.component.css',
  imports: [RouterModule, ReactiveFormsModule, FormsModule,MatCard,
     MatInputModule, MatFormFieldModule,MatToolbar, SidebarComponent,
    MatIconModule, MatTableModule, MatPaginatorModule]
})
export class TipoCamisetaListComponent {
  displayedColumns: string[] = ['id', 'nome', 'acao'];
  tipocamisetas: TipoCamiseta[] = [];
  tipocamisetasSubscription: Subscription | undefined;

  totalRecords = 0;
  pageSize = 2;
  page = 0;
  searchText: string = '';
  administradoresSubscription: Subscription | undefined;

  constructor(private dialog: MatDialog,
    private tipocamisetaService: TipoCamisetaService) { }

  ngOnInit(): void {
    this.tipocamisetaService.findAll(this.page, this.pageSize).subscribe(data => {
      this.tipocamisetas = data;
    });

    this.tipocamisetaService.count().subscribe(data => {
      this.totalRecords = data;

    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  //Verifica se this.administradoresSubscription existe e não é nulo.
  ngOnDestroy(): void {
    if (this.tipocamisetasSubscription) {
      this.tipocamisetasSubscription.unsubscribe();
    }
  }

  search() {
    // Se o texto de busca estiver vazio, busque todos os administradores
    if (!this.searchText.trim()) {
      this.tipocamisetaService.findAll().subscribe(
        data => {
          this.tipocamisetas = data;
        },
        error => {
          console.error('Erro ao buscar administradores:', error);
        }
      );
      return;
    }
    // Converter searchText para minúsculas para busca insensível a maiúsculas e minúsculas
    const termoDeBusca = this.searchText.toLowerCase();
    this.tipocamisetaService.findByNome(termoDeBusca).subscribe(
      data => {
        this.tipocamisetas = data;
      },
      error => {
        console.error('Erro ao buscar por nome:', error);
      }
    );
  }

  //Caixa de dialogo para excluir
  confirmDelete(tipocamisetas: TipoCamiseta): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true && tipocamisetas && tipocamisetas.id !== undefined) {

        this.tipocamisetaService.delete(tipocamisetas).subscribe(
          () => {
            // Atualizar lista de administradores após exclusão
            this.tipocamisetas = this.tipocamisetas.filter(adm => adm.id !== tipocamisetas.id);
          }
        );
      }
    });
  }
  visualizarDados(tipocamiseta: TipoCamiseta): void {
    this.dialog.open(ViewTipoCamisetaComponent, {
      width: '600px',
      height: '455px',
      data: tipocamiseta
    });
    console.log(tipocamiseta)
  }

}
