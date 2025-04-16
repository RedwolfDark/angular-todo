import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { NavbarItemComponent } from '../navbar-items/navbar-items.component';
import { MENUITEMS } from './menu.data';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NavbarItemComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private _showMenu = signal(false);
  showMenu = this._showMenu.asReadonly();

  menuItems = MENUITEMS;

  toggleMenu() {
    this._showMenu.update((show) => !show);
  }
}
