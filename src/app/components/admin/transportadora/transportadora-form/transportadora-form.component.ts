import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { CommonModule, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MatOptionModule } from '@angular/material/core';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Telefone } from '../../../../models/telefone.model';
import { TransportadoraService } from '../../../../services/transportadora.service';
import { ConfirmationDialogComponent } from '../../../confirmation/confirmation-dialog.component';
import { ErrorComponent } from '../../../error/error.component';
import { Transportadora } from '../../../../models/transportadora';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { SidebarComponent } from '../../../template/sidebar/sidebar.component';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, MatSelectModule,SidebarComponent,
    MatOptionModule, RouterModule, NgIf,
   MatInputModule, MatFormFieldModule, MatFormField,
    MatIconModule, MatCardContent, MatCard, MatCardActions,  ReactiveFormsModule],
  templateUrl: './transportadora-form.component.html',
  styleUrl: './transportadora-form.component.css'
})
export class TransportadoraFormComponent {
  transportadoras: Transportadora[] = [];
  telefones: Telefone[] = [];
  formGroup!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private transportadoraService: TransportadoraService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private dialogError: MatDialog
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      capacidade: ['', Validators.required],
      tarifa: ['', Validators.required],

      listaTelefones: this.formBuilder.array([
        this.createTelefoneFormGroup() ]),
    });

    const routeData = this.activatedRoute.snapshot.data;
    if (routeData['transportadora']) {
      this.formGroup.patchValue(routeData['transportadora']);
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

  salvar() {
    console.log('Entrou no salvar');
    console.log('Formulário:', this.formGroup.value);
    console.log('Formulário válido:', this.formGroup.valid);

    // Verificar se o formulário é válido
    if (this.formGroup.valid) {
      const transportadora = this.formGroup.value;
      // Verificar se é uma inserção ou atualização
      if (transportadora.id == null) {
        console.log(transportadora.nivelAcesso);
        // Inserir novo transportadora
        this.transportadoraService.insert(transportadora).subscribe({
          next: (transportadoraService) => {
            console.log('Formulário inserido ', this.formGroup.value);
            this.router.navigateByUrl('/transportadoras/list');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
            if (err instanceof HttpErrorResponse && err.error && err.error.errors && err.error.errors.length > 0) {
              const errorMessage = err.error.errors[0].message;
              this.mostrarErro(errorMessage);
            } else {
              this.mostrarErro('Erro ao criar transportadora: ' + err.message);
            }
          }
        });
      } else {
        // Atualizar transportadora existente
        this.transportadoraService.update(transportadora).subscribe({
          next: (transportadoraService) => {
            this.router.navigateByUrl('/transportadoras/list');
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
      const transportadora = this.formGroup.value;
      if (transportadora.id != null) {
        this.transportadoraService.delete(transportadora).subscribe({
          next: () => {
            this.router.navigateByUrl('/transportadoras/list');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

  confirmDelete(transportadora: Transportadora): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true && transportadora && transportadora.id !== undefined) {
        this.transportadoraService.delete(transportadora).subscribe(
          () => {
            // Atualizar lista de transportadoras após exclusão
            this.transportadoras = this.transportadoras.filter(adm => adm.id !== transportadora.id);

            this.router.navigateByUrl('/transportadoras/list');
          },
          error => {
            console.log('Erro ao excluir transportadora:', error);
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
