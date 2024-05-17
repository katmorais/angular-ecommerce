import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Cartao } from '../../../../models/cartao.model';
import { CartaoService } from '../../../../services/cartao.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { Usuario } from '../../../../models/usuario.model';
import { NavsideComponent } from '../../../shared/sidebar/navside.component';


@Component({
  selector: 'app-cartao-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,NavsideComponent,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule, MatMenuModule],
  templateUrl: './cartao-form.component.html',
  styleUrl: './cartao-form.component.css'
})

export class CartaoFormComponent implements OnInit {

  formGroup: FormGroup;
  /* usuario: Usuario | null = null; */
  testId: string = '';

  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    const cartao: Cartao = activatedRoute.snapshot.data['cartao'];

    this.formGroup = formBuilder.group({
      id: [(cartao && cartao.id) ? cartao.id : null],
      nome: [(cartao && cartao.nome) ? cartao.nome : '', Validators.required],
      numeroCartao: [(cartao && cartao.numeroCartao) ? cartao.numeroCartao : '', Validators.required],
      dataVencimento: [(cartao && cartao.dataVencimento) ? cartao.dataVencimento : '', Validators.required],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.testId = params['id'];
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const cartao = this.formGroup.value;
      if (cartao.id == null) {
        const cartoes = [cartao]; // Coloque o cartão em um vetor
        this.usuarioService.addCartoesToUsuario(this.testId, cartoes).subscribe({
          next: (cartoesCadastrados) => {
            this.router.navigateByUrl('/usuarios/list');
          },
          error: (err) => {
            console.log('Erro ao Incluir', err);
          }
        });
      } else {
        /* this.cartaoService.update(cartao).subscribe({
          next: (cartaoAlterado) => {
            this.router.navigateByUrl('/cartoes');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          }
        }); */
      }
    }
  }

  excluir() {
    /* if (this.formGroup.valid) {
      const cartao = this.formGroup.value;
      if (cartao.id != null) {
        this.cartaoService.delete(cartao).subscribe({
          next: () => {
            this.router.navigateByUrl('/cartoes');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    } */
  }

}