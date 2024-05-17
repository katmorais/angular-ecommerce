import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario.service';
import { Usuario } from '../../../../models/usuario.model';
import { Telefone } from '../../../../models/telefone.model';
import { TelefoneService } from '../../../../services/telefone.service';
import { NavsideComponent } from '../../../shared/sidebar/navside.component';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, MatSelectModule,NavsideComponent],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent implements OnInit {

  formGroup: FormGroup;
  telefones: Telefone[] = [];

  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private telefoneService: TelefoneService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.formGroup = formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      senha: ['', Validators.required],
      login: ['', Validators.required],
      telefone: [null]
    });
  }
  ngOnInit(): void {
    this.telefoneService.findAll().subscribe(data => {
      this.telefones = data;
      this.initializeForm();
    });
  }

  initializeForm() {

    const usuario: Usuario = this.activatedRoute.snapshot.data['usuario'];

    // selecionando o telefone
   /*  const telefone = this.telefones
    .find(telefone => telefone.id === (usuario?.listaTelefone?.id || null)); */

    this.formGroup = this.formBuilder.group({
      id: [(usuario && usuario.id) ? usuario.id : null],
      nome: [(usuario && usuario.nome) ? usuario.nome : '', Validators.required],
      senha: [(usuario && usuario.senha) ? usuario.senha : '', Validators.required],
      login: [(usuario && usuario.login) ? usuario.login : '', Validators.required],
      /* telefone: [telefone] */
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const usuario = this.formGroup.value;
      if (usuario.id ==null) {
        this.usuarioService.insert(usuario).subscribe({
          next: (usuarioCadastrado) => {
            this.router.navigateByUrl('/usuarios/list');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.usuarioService.update(usuario).subscribe({
          next: (usuarioAlterado) => {
            this.router.navigateByUrl('/usuarios');
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
      const usuario = this.formGroup.value;
      if (usuario.id != null) {
        this.usuarioService.delete(usuario).subscribe({
          next: () => {
            this.router.navigateByUrl('/usuarios');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

}