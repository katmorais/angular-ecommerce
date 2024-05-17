import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Cartao } from '../../../../models/cartao.model';
import { CartaoService } from '../../../../services/cartao.service';


@Component({
  selector: 'app-cartao-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
  , MatButtonModule, RouterModule],
  templateUrl: './cartao-list.component.html',
  styleUrl: './cartao-list.component.css'
})
export class CartaoListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'numeroCartao','dataVencimento'];

  cartao: Cartao[] = [];

  constructor(private cartaoService: CartaoService) {

  }

  ngOnInit(): void {
    this.cartaoService.findAll().subscribe(data => {
      this.cartao = data;
    })
  }

}