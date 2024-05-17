import { Component, ElementRef, Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Camiseta } from '../../../../models/camiseta.model';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewCamisetaComponent {
  constructor(
    public viewRef: MatDialogRef<ViewCamisetaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Camiseta,
    private router: Router,
    private elementRef: ElementRef
  ) { }


  editar(id: number): void {
    this.router.navigate(['/camisetas/edit', id]);
    this.viewRef.close(); 
  }

  cancelar(): void {
    this.viewRef.close(false);
  }
}