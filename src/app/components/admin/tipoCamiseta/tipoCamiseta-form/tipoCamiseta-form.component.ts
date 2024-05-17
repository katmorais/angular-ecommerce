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

import { ConfirmationDialogComponent } from '../../../confirmation/confirmation-dialog.component';
import { NavsideComponent } from '../../../shared/sidebar/navside.component';
import { TipoCamiseta } from '../../../../models/tipocamiseta.model';
import { TipoCamisetaService } from '../../../../services/tipoCamiseta.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-tipocamiseta-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,NavsideComponent,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule, MatMenuModule, MatListModule, MatDividerModule, MatSidenavContent,MatSidenavContainer,MatSidenav ],
  templateUrl: './tipoCamiseta-form.component.html',
  styleUrl: './tipoCamiseta-form.component.css'
})
export class TipoCamisetaFormComponent {
  tipocamiseta: TipoCamiseta[] = [];
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private tipocamisetaService: TipoCamisetaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private dialogError: MatDialog
  ){
    const tipocamiseta: TipoCamiseta = this.activatedRoute.snapshot.data['tipocamiseta'];

    this.formGroup = formBuilder.group({
      id: [(tipocamiseta && tipocamiseta.id) ? tipocamiseta.id : null],
      nome: [(tipocamiseta && tipocamiseta.nome) ? tipocamiseta.nome : '', Validators.required],
      
    });

  }

  salvar() {
    if (this.formGroup.valid) {
      const tipocamiseta = this.formGroup.value;
      if (tipocamiseta.id ==null) {
        this.tipocamisetaService.insert(tipocamiseta).subscribe({
          next: (tipocamisetaCadastrado) => {
            this.router.navigateByUrl('/tipocamisetas/list');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.tipocamisetaService.update(tipocamiseta).subscribe({
          next: (tipocamisetaAlterado) => {
            this.router.navigateByUrl('/tipocamisetas/list');
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
      const tipocamiseta = this.formGroup.value;
      if (tipocamiseta.id != null) {
        this.tipocamisetaService.delete(tipocamiseta).subscribe({
          next: () => {
            this.router.navigateByUrl('/tipocamisetas/list');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }
  confirmDelete(tipocamiseta: TipoCamiseta): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true && tipocamiseta && tipocamiseta.id !== undefined) {
        this.tipocamisetaService.delete(tipocamiseta).subscribe(
          () => {
            // Atualizar lista de administradores após exclusão
            this.tipocamiseta = this.tipocamiseta.filter(adm => adm.id !== tipocamiseta.id);

            // Redirecionar para '/adm/list'
            this.router.navigateByUrl('/tipocamisetas/list');
          },
          error => {
            console.log('Erro ao excluir TipoCamiseta:', error);
          }
        );
      }
    });
  }

}
