import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {JsonPipe, NgFor, NgIf} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {Camiseta} from '../../../../models/camiseta.model';
import {CamisetaService} from '../../../../services/camiseta.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../../../confirmation/confirmation-dialog.component';
import {ErrorComponent} from '../../../error/error.component';
import {Fornecedor} from '../../../../models/fornecedor.model';
import {FornecedorService} from '../../../../services/fornecedor.service';
import {MatSelectModule} from '@angular/material/select';
import {MatIcon} from '@angular/material/icon';
import {TipoCamiseta} from '../../../../models/tipocamiseta.model';
import {TipoCamisetaService} from '../../../../services/tipoCamiseta.service';
import {Marca} from '../../../../models/marca.model';
import {MarcaService} from '../../../../services/marca.service';
import {SidebarComponent} from '../../../template/sidebar/sidebar.component';
import {Tamanhos} from '../../../../models/tamanho.enum';
import {Sexos} from "../../../../models/sexo.enum";

@Component({
  selector: 'app-camiseta-form',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule, MatFormFieldModule, SidebarComponent, MatSelectModule, MatIcon,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule, MatMenuModule, MatListModule, MatDividerModule, MatSidenavContent, MatSidenavContainer, MatSidenav, JsonPipe],
  templateUrl: './camiseta-form.component.html',
  styleUrl: './camiseta-form.component.css'
})
export class CamisetaFormComponent implements OnInit {
  formGroup: FormGroup;
  apiResponse: any = null;

  fileName: string = '';
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null

  tamanhos = Tamanhos;
  sexos = Sexos;
  coresList: string[] = [];
  tipoCamisetas: TipoCamiseta[] = [];
  camisetas: Camiseta[] = [];
  fornecedores: Fornecedor[] = [];
  marcas: Marca[] = [];
  camisetaForm = new FormGroup({
    cores: new FormControl('')

  });

  constructor(private formBuilder: FormBuilder,
              private camisetaService: CamisetaService,
              private fornecedorService: FornecedorService,
              private tipoCamisetaService: TipoCamisetaService,
              private marcaService: MarcaService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog) {

    const camiseta: Camiseta = activatedRoute.snapshot.data['camiseta'];

    this.formGroup = formBuilder.group({
      id: [(camiseta && camiseta.id) ? camiseta.id : null],
      nome: [(camiseta && camiseta.nome) ? camiseta.nome : '', Validators.required],
      descricao: [(camiseta && camiseta.descricao) ? camiseta.descricao : '', Validators.required],
      estoque: [(camiseta && camiseta.estoque) ? camiseta.estoque : '', Validators.required],
      preco: [(camiseta && camiseta.preco) ? camiseta.preco : '', Validators.required],
      estampa: [(camiseta && camiseta.estampa) ? camiseta.estampa : '', Validators.required],
      tecido: [(camiseta && camiseta.tecido) ? camiseta.tecido : '', Validators.required],
      tamanho: [null, Validators.required],
      sexo: [null, Validators.required],
      fornecedor: [null, Validators.required],
      tipoCamiseta: [null, Validators.required],
      marca: [null, Validators.required],
      cores: [camiseta?.cores.map(cor => cor.nome) || [], Validators.required]
    });
  }

  ngOnInit(): void {
    this.fornecedorService.findAll().subscribe(data => {
      this.fornecedores = data;
      this.initializeForm();
    });
    this.tipoCamisetaService.findAll().subscribe(data => {
      this.tipoCamisetas = data;
      this.initializeForm();
    });
    this.marcaService.findAll().subscribe(data => {
      this.marcas = data;
      this.initializeForm();
    });
  }

  initializeForm() {
    const camiseta: Camiseta = this.activatedRoute.snapshot.data['camiseta'];

    // selecionando o fornecedor
    const fornecedor = this.fornecedores
      .find(fornecedor => fornecedor.id === (camiseta?.fornecedor?.id || null));

    // selecionando o tipo de camiseta
    const tipoCamiseta = this.tipoCamisetas
      .find(tipoCamiseta => tipoCamiseta.id === (camiseta?.tipoCamiseta?.id || null));

    // selecionando a marca
    const marca = this.marcas
      .find(marca => marca.id === (camiseta?.marca?.id || null));


    this.formGroup = this.formBuilder.group({
      id: [(camiseta && camiseta.id) ? camiseta.id : null],
      nome: [(camiseta && camiseta.nome) ? camiseta.nome : '', Validators.required],
      descricao: [(camiseta && camiseta.descricao) ? camiseta.descricao : '', Validators.required],
      estoque: [(camiseta && camiseta.estoque) ? camiseta.estoque : '', Validators.required],
      preco: [(camiseta && camiseta.preco) ? camiseta.preco : '', Validators.required],
      estampa: [(camiseta && camiseta.estampa) ? camiseta.estampa : '', Validators.required],
      tecido: [(camiseta && camiseta.tecido) ? camiseta.tecido : '', Validators.required],
      tamanho: [camiseta?.tamanho.id || null, Validators.required],
      sexo: [camiseta?.sexo, Validators.required],
      fornecedor: [fornecedor?.id],
      tipoCamiseta: [tipoCamiseta?.id],
      marca: [marca?.id],
      cores: [camiseta?.cores.map(cor => cor.nome) || []]
    });
  }

  voltarPagina() {
    this.router.navigate(['admin/camisetas/list']);

  }

  salvar() {
    if (this.formGroup.valid) {
      const camiseta = this.formGroup.value;
      if (camiseta.id == null) {
        this.camisetaService.save(camiseta).subscribe({
          next: (camisetaCadastrada) => {
            this.uploadImage(camisetaCadastrada.id);
          },
          error: (errorResponse) => {
            // Processar erros da API
            this.apiResponse = errorResponse.error;

            // Associar erros aos campos do formulário
            this.formGroup.get('nome')?.setErrors({apiError: this.getErrorMessage('nome')});
            this.formGroup.get('preco')?.setErrors({apiError: this.getErrorMessage('preco')});

            console.log('Erro ao incluir' + JSON.stringify(errorResponse));
          }
        });
      } else {
        this.camisetaService.update(camiseta).subscribe({
          next: (camisetaAtualizada) => {
            this.uploadImage(camisetaAtualizada.id);
          },
          error: (err) => {
            console.log('Erro ao alterar' + JSON.stringify(err));
          }
        });
      }
    }
  }

  getErrorMessage(fieldName: string): string {
    if (this.apiResponse && this.apiResponse.errors && this.apiResponse.errors.length > 0) {
      const error = this.apiResponse.errors.find((error: any) => error.fieldName === fieldName);
      return error ? error.message : '';
    }
    return '';
  }

  excluir() {
    if (this.formGroup.valid) {
      const camiseta = this.formGroup.value;
      if (camiseta.id != null) {
        this.camisetaService.delete(camiseta).subscribe({
          next: () => {
            this.router.navigateByUrl('admin/camisetas/list');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

  confirmDelete(camiseta: Camiseta): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result && camiseta && camiseta.id !== undefined) {
        this.camisetaService.delete(camiseta).subscribe(
          () => {
            // Atualizar lista de camisetaes após exclusão
            this.camisetas = this.camisetas.filter(adm => adm.id !== camiseta.id);

            this.router.navigateByUrl('admin/camisetas/list');
          },
          error => {
            console.log('Erro ao excluir camiseta:', error);
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

  adicionarCor(cor: string): void {
    cor = cor?.trim();

    if (cor) {
      this.formGroup.get('cores')?.value.push(cor);
    }
  }

  removerCor(corRemover: string) {
    (this.formGroup.get('cores')?.value as string[]).filter(cor => cor != corRemover);
  }

  onlyNumberKey(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  carregarImagemSelecionada(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;
      // carregando image preview
      const reader = new FileReader();
      reader.onload = e => this.imagePreview = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }

  }

  private uploadImage(camisetaId: number) {
    if (this.selectedFile) {
      this.camisetaService.uploadImagem(camisetaId, this.selectedFile.name, this.selectedFile)
        .subscribe({
          next: () => {
            this.voltarPagina();
          },
          error: () => {
            console.log('Erro ao fazer o upload da imagem');
            // tratar o erro
          }
        })
    } else {
      this.voltarPagina();
    }
  }

}
