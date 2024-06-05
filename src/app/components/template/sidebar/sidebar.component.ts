import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenav } from '@angular/material/sidenav';
import { SidebarService } from '../../../services/sidebar.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatList, MatListItem, MatNavList } from '@angular/material/list';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenav, MatDrawer, MatDrawerContainer, RouterModule, MatIcon, MatExpansionModule,
           MatDrawerContent, MatToolbar, MatList, MatNavList, MatListItem, RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @ViewChild('drawer') drawer: MatDrawer | undefined;

  toggleDrawer() {
    if (this.drawer) {
      this.drawer.toggle();
    } else {
      console.error('Drawer is undefined');
    }
  }
}
