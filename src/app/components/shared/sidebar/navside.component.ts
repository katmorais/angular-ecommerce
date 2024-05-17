import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgFor } from '@angular/common';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatNavList } from '@angular/material/list';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navside',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, NgFor, CommonModule,NavsideComponent, MatMenu, MatMenuTrigger, MatSidenavContent, MatToolbar, MatNavList,RouterLink, RouterOutlet],
  templateUrl: './navside.component.html',
  styleUrl: './navside.component.css'
})
export class NavsideComponent {
  isSubmenuOpen: boolean[] = [false, false, false, false]; // Array para controlar o estado de cada submenu

  toggleSubmenu(index: number) {
    // Alterna o estado do submenu correspondente ao índice passado
    this.isSubmenuOpen[index] = !this.isSubmenuOpen[index];
    console.log('Submenu aberto:', this.isSubmenuOpen[index]);

    // Adiciona ou remove a classe 'active' conforme o estado do submenu
    const submenu = document.getElementsByClassName('submenu')[index];
    if (this.isSubmenuOpen[index]) {
      submenu.classList.add('active');
    } else {
      submenu.classList.remove('active');
    }
  }
}
