import {JsonPipe, NgIf} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {UsuarioService} from '../../../../services/usuario.service';
import {ClienteModel} from '../../../../models/clienteModel';
import {SidebarComponent} from '../../../template/sidebar/sidebar.component';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import {Cidade} from "../../../../models/cidade.model";
import {CidadeService} from "../../../../services/cidade.service";


@Component({
  selector: 'app-usuario-form',
  standalone: true,
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}, provideNativeDateAdapter()],
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, MatSelectModule, SidebarComponent, MatDatepickerInput, MatDatepickerToggle, MatDatepicker, JsonPipe],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent implements OnInit {

  formGroup: FormGroup;
  cidades: Cidade[] = [];

  constructor(private formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              private cidadeService: CidadeService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    this.formGroup = formBuilder.group({
      id: [null],
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      username: ['', [Validators.required, Validators.maxLength(20)]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      dataNascimento: [null, Validators.required],
      cidadeId: [null, Validators.required],
      estadoId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.cidadeService.findAll().subscribe({
      next: (cidades) => {
        this.cidades = cidades;
        this.initializeForm();
      }, error: () => console.log('Erro ao carregar cidades')
    });
  }

  initializeForm() {

    const usuario: ClienteModel = this.activatedRoute.snapshot.data['usuario'];

    this.formGroup = this.formBuilder.group({
      id: [usuario?.id || null],
      nome: [usuario?.pessoa.username || '', [Validators.required, Validators.maxLength(100)]],
      username: [usuario?.pessoa.usuario.username || '', [Validators.required, Validators.maxLength(20)]],
      senha: [usuario?.pessoa.usuario.senha || '', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      cpf: [usuario?.pessoa.cpf || '', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      dataNascimento: [usuario?.pessoa.dataNascimento || null, Validators.required],
      cidadeId: [null, Validators.required],
      estadoId: [null, Validators.required]
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const usuario = this.formGroup.value;
      if (usuario.id == null) {
        this.usuarioService.insert(usuario).subscribe({
          next: () => {
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.usuarioService.update(usuario).subscribe({
          next: () => {
            this.router.navigate(['/login']);
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

  onCidadeSelecionada($event: MatSelectChange): void {
    const cidade = $event.value;
    this.formGroup.get('cidadeId')?.setValue(cidade?.id);
    this.formGroup.get('estadoId')?.setValue(cidade?.estado?.id);
  }
}
