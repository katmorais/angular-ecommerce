import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { Fornecedor } from '../../../../models/fornecedor.model';
import { FornecedorService } from '../../../../services/fornecedor.service';
import { ConfirmationDialogComponent } from '../../../confirmation/confirmation-dialog.component';
import { ViewFornecedorComponent } from '../view/view.component';
import { MatToolbar } from '@angular/material/toolbar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card';
import { formatDate } from '@angular/common';
import { SidebarComponent } from '../../../template/sidebar/sidebar.component';


@Component({
  selector: 'app-fornecedor-list',
  standalone: true,
  imports: [RouterModule, ViewFornecedorComponent, ConfirmationDialogComponent, ReactiveFormsModule, FormsModule,MatToolbar ,
    MatInputModule, MatFormFieldModule, MatPaginator, MatCardContent, MatCard, SidebarComponent,
    MatIconModule, MatTableModule],
  templateUrl: './fornecedor-list.component.html',
  styleUrl: './fornecedor-list.component.css'
})
export class FornecedorListComponent {
  displayedColumns: string[] = ['id','nome', 'dataContrato', 'acao'];
  fornecedores: Fornecedor[] = [];
  dataSource = new MatTableDataSource;


  fornecedoresSubscription: Subscription | undefined;
  totalRecords = 0;
  pageSize = 2;
  page = 0;
  constructor(private dialog: MatDialog,
    private fornecedorService: FornecedorService) { }


    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  ngOnInit(): void {
    this.fornecedoresSubscription = this.fornecedorService.findAll().subscribe(data => {
      this.fornecedores = data;
      console.log(data);
    });
  }

  //Verifica se this.fornecedorsSubscription existe e não é nulo.
  ngOnDestroy(): void {
    if (this.fornecedoresSubscription) {
      this.fornecedoresSubscription.unsubscribe();
    }
  }

  // Campo de Pesquisa:
  searchText: string = '';
  search() {
    // Se o texto de busca estiver vazio, busque todos os fornecedors
    if (!this.searchText.trim()) {
      this.fornecedorService.findAll().subscribe(
        data => {
          this.fornecedores = data;
        },
        error => {
          console.error('Erro ao buscar fornecedors:', error);
        }
      );
      return;
    }
    // Converter searchText para minúsculas para busca insensível a maiúsculas e minúsculas
    const termoDeBusca = this.searchText.toLowerCase();
    this.fornecedorService.findByNome(termoDeBusca).subscribe(
      data => {
        this.fornecedores = data;
      },
      error => {
        console.error('Erro ao buscar por nome:', error);
      }
    );
  }
  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  //Caixa de dialogo para excluir
  confirmDelete(fornecedor: Fornecedor): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true && fornecedor && fornecedor.id !== undefined) {

        this.fornecedorService.delete(fornecedor).subscribe(
          () => {
            // Atualizar lista de fornecedors após exclusão
            this.fornecedores = this.fornecedores.filter(adm => adm.id !== fornecedor.id);
          }
        );
      }
    });
  }

  cortarNome(nome: string): string {
    const maxCaracteres = 10; // Defina o número máximo de caracteres desejado
    return nome.length > maxCaracteres ? nome.substring(0, maxCaracteres) + '...' : nome;
  }
  formatarData(data: any): string {
    return formatDate(data, 'shortDate', 'en-US'); // 'shortDate' é o formato desejado, você pode alterá-lo conforme necessário
  }


  visualizarDados(fornecedor: Fornecedor): void {
    this.dialog.open(ViewFornecedorComponent, {
      width: '600px',
      height: '455px',
      data: fornecedor
    });
    console.log(fornecedor)
  }
}
