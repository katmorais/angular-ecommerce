import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Marca } from '../../../../models/marca.model';
import { MarcaService } from '../../../../services/marca.service';


@Component({
  selector: 'app-marca-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
  , MatButtonModule, RouterModule],
  templateUrl: './marca-list.component.html',
  styleUrl: './marca-list.component.css'
})
export class MarcaListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'descricao','acao'];

  marca: Marca[] = [];

  constructor(private marcaService: MarcaService) {

  }

  ngOnInit(): void {
    this.marcaService.findAll().subscribe(data => {
      this.marca = data;
    })
  }

}