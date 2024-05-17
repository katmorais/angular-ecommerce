import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
import { CommonModule, NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Usuario } from '../../../../models/usuario.model';
import { NavsideComponent } from '../../../shared/sidebar/navside.component';
import { Subscription } from 'rxjs';
import { MatCard } from '@angular/material/card';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [NgFor, CommonModule, MatTableModule, MatToolbarModule, MatIconModule
  , MatButtonModule, RouterModule,NavsideComponent,MatCard],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css'
})
export class UsuarioListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'senha', 'listaTelefone','listaEndereco','cartoes','acao'];
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {

  }

  ngOnInit(): void {
    this.usuarioService.findAll().subscribe(data => {
      this.usuarios = data;
      console.log(data);
    })
  }
  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }
  totalRecords = 0;
  pageSize = 2;
  page = 0;
  searchText: string = '';
  administradoresSubscription: Subscription | undefined;


}