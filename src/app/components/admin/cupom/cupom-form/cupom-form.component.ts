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
import { Cupom } from '../../../../models/cupom.model';
import { CupomService } from '../../../../services/cupom.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../confirmation/confirmation-dialog.component';
import { SidebarComponent } from '../../../template/sidebar/sidebar.component';
import { HeaderComponent } from '../../../template/header/header.component';


@Component({
  selector: 'app-cupom-form',
  standalone: true,
  imports:  [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule, MatMenuModule],
  templateUrl: './cupom-form.component.html',
  styleUrl: './cupom-form.component.css'
})
export class CupomFormComponent {
  cupom: Cupom[] = [];
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cupomService: CupomService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private dialogError: MatDialog
  ){
    const cupom: Cupom = this.activatedRoute.snapshot.data['cupom'];

    this.formGroup = formBuilder.group({
      id: [(cupom && cupom.id) ? cupom.id : null],
      codigo: [(cupom && cupom.codigo) ? cupom.codigo : '', Validators.required],
      valorDesconto: [(cupom && cupom.valorDesconto) ? cupom.valorDesconto : '', Validators.required],
      validade: [(cupom && cupom.validade) ? cupom.validade : '', Validators.required],

    });

  }

  salvar() {
    if (this.formGroup.valid) {
      const cupom = this.formGroup.value;
      if (cupom.id ==null) {
        this.cupomService.insert(cupom).subscribe({
          next: (cupomCadastrado) => {
            this.router.navigateByUrl('admin/cupons/list');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.cupomService.update(cupom).subscribe({
          next: (cupomAlterado) => {
            this.router.navigateByUrl('admin/cupons/list');
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
      const cupom = this.formGroup.value;
      if (cupom.id != null) {
        this.cupomService.delete(cupom).subscribe({
          next: () => {
            this.router.navigateByUrl('admin/cupons/list');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }
  confirmDelete(cupom: Cupom): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true && cupom && cupom.id !== undefined) {
        this.cupomService.delete(cupom).subscribe(
          () => {
            // Atualizar lista de administradores após exclusão
            this.cupom = this.cupom.filter(adm => adm.id !== cupom.id);

            // Redirecionar para '/adm/list'
            this.router.navigateByUrl('admin/cupons/list');
          },
          error => {
            console.log('Erro ao excluir Cupom:', error);
          }
        );
      }
    });
  }
}
