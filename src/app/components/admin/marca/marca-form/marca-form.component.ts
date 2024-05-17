import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { Marca } from '../../../../models/marca.model';
import { MarcaService } from '../../../../services/marca.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../confirmation/confirmation-dialog.component';
import { NavsideComponent } from '../../../shared/sidebar/navside.component';


@Component({
  selector: 'app-marca-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,NavsideComponent,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule, MatMenuModule, MatListModule, MatDividerModule, MatSidenavContent,MatSidenavContainer,MatSidenav ],
  templateUrl: './marca-form.component.html',
  styleUrl: './marca-form.component.css'
})
export class MarcaFormComponent {
  marca: Marca[] = [];
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private marcaService: MarcaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private dialogError: MatDialog
  ){
    const marca: Marca = this.activatedRoute.snapshot.data['marca'];

    this.formGroup = formBuilder.group({
      id: [(marca && marca.id) ? marca.id : null],
      nome: [(marca && marca.nome) ? marca.nome : '', Validators.required],
      descricao: [(marca && marca.descricao) ? marca.descricao : '', Validators.required],
      
    });

  }

  salvar() {
    if (this.formGroup.valid) {
      const marca = this.formGroup.value;
      if (marca.id ==null) {
        this.marcaService.insert(marca).subscribe({
          next: (marcaCadastrado) => {
            this.router.navigateByUrl('/marcas/list');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.marcaService.update(marca).subscribe({
          next: (marcaAlterado) => {
            this.router.navigateByUrl('/marcas/list');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          }
        });
      }
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const marca = this.formGroup.value;
      if (marca.id != null) {
        this.marcaService.delete(marca).subscribe({
          next: () => {
            this.router.navigateByUrl('/marcas/list');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }
  confirmDelete(marca: Marca): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true && marca && marca.id !== undefined) {
        this.marcaService.delete(marca).subscribe(
          () => {
            // Atualizar lista de administradores após exclusão
            this.marca = this.marca.filter(adm => adm.id !== marca.id);

            // Redirecionar para '/adm/list'
            this.router.navigateByUrl('/marcas/list');
          },
          error => {
            console.log('Erro ao excluir Marca:', error);
          }
        );
      }
    });
  }


}
