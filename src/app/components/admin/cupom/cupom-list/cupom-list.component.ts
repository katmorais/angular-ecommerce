import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Cupom } from '../../../../models/cupom.model';
import { CupomService } from '../../../../services/cupom.service';


@Component({
  selector: 'app-cupom-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule],
  templateUrl: './cupom-list.component.html',
  styleUrl: './cupom-list.component.css'
})
export class CupomListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'codigo', 'valorDesconto', 'validade', 'acao'];

  cupom: Cupom[] = [];

  constructor(private cupomService: CupomService) {

  }

  ngOnInit(): void {
    this.cupomService.findAll().subscribe(data => {
      this.cupom = data;
    })
  }

}
