import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { CommonModule, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FornecedorService } from '../../../../services/fornecedor.service';
import { Fornecedor } from '../../../../models/fornecedor.model';
import { Telefone } from '../../../../models/telefone.model';
import { ConfirmationDialogComponent } from '../../../confirmation/confirmation-dialog.component';
import { ErrorComponent } from '../../../error/error.component';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { SidebarComponent } from '../../../template/sidebar/sidebar.component';


@Component({
  selector: 'app-fornecedor-form',
  standalone: true,
  imports: [ErrorComponent, CommonModule, MatSelectModule,SidebarComponent,
    MatOptionModule, RouterModule, NgIf,
    ReactiveFormsModule, FormsModule,MatCardContent, MatCardActions, MatCard,
    MatInputModule, MatFormFieldModule,
    MatIconModule, ConfirmationDialogComponent],
  templateUrl: './fornecedor-form.component.html',
  styleUrl: './fornecedor-form.component.css'
})
export class FornecedorFormComponent {
  fornecedores: Fornecedor[] = [];
  telefones: Telefone[] = [];

  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private fornecedorService: FornecedorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      dataContrato: ['', Validators.required],
      listaTelefones: this.formBuilder.array([
        this.createTelefoneFormGroup() ])

    });

    const routeData = this.activatedRoute.snapshot.data;
    if (routeData['fornecedor']) {
      this.formGroup.patchValue(routeData['fornecedor']);
    }
  }

  createTelefoneFormGroup(): FormGroup {
    return this.formBuilder.group({
      codigoArea: ['', Validators.required],
      numero: ['', Validators.required],
    });
  }

  get listaTelefones(): FormArray {
    return this.formGroup.get('listaTelefones') as FormArray;
  }

  adicionarTelefone() {
    this.listaTelefones.push(this.createTelefoneFormGroup());
  }

  removerTelefone(index: number) {
    this.listaTelefones.removeAt(index);
  }

  get listaEnderecos(): FormArray {
    return this.formGroup.get('listaEnderecos') as FormArray;
  }


  salvar() {
    console.log('Entrou no salvar');
    console.log('Formulário:', this.formGroup.value);
    console.log('Formulário válido:', this.formGroup.valid);

    // Verificar se o formulário é válido
    if (this.formGroup.valid) {
      const fornecedor = this.formGroup.value;
      // Verificar se é uma inserção ou atualização
      if (fornecedor.id == null) {
        console.log(fornecedor.nivelAcesso);
        // Inserir novo fornecedor
        this.fornecedorService.insert(fornecedor).subscribe({
          next: (fornecedorService) => {
            console.log('Formulário inserido ', this.formGroup.value);
            this.router.navigateByUrl('admin/fornecedores/list');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
            if (err instanceof HttpErrorResponse && err.error && err.error.errors && err.error.errors.length > 0) {
              const errorMessage = err.error.errors[0].message;
              this.mostrarErro(errorMessage);
            } else {
              this.mostrarErro('Erro ao criar fornecedor: ' + err.message);
            }
          }
        });
      } else {
        // Atualizar fornecedor existente
        this.fornecedorService.update(fornecedor).subscribe({
          next: (fornecedorService) => {
            this.router.navigateByUrl('admin/fornecedores/list');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          }
        });
      }
    } else {
      // Se o formulário for inválido, exibir mensagem de erro
      console.log('Formulário inválido');
      this.mostrarErro('Por favor, preencha todos os campos obrigatórios.');
    }
  }


  excluir() {
    if (this.formGroup.valid) {
      const fornecedor = this.formGroup.value;
      if (fornecedor.id != null) {
        this.fornecedorService.delete(fornecedor).subscribe({
          next: () => {
            this.router.navigateByUrl('admin/fornecedores/list');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

  confirmDelete(fornecedor: Fornecedor): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true && fornecedor && fornecedor.id !== undefined) {
        this.fornecedorService.delete(fornecedor).subscribe(
          () => {
            // Atualizar lista de fornecedors após exclusão
            this.fornecedores = this.fornecedores.filter(adm => adm.id !== fornecedor.id);

            this.router.navigateByUrl('admin/fornecedores/list');
          },
          error => {
            console.log('Erro ao excluir fornecedor:', error);
          }
        );
      }
    });
  }

  mostrarErro(mensagemErro: string): void {
    this.dialog.open(ErrorComponent, {
      data: mensagemErro
    });
  }
}
