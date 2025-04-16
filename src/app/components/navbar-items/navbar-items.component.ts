import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

export interface NavbarItem {
  title: string;
  id: string;
  href: string;
  is_active: boolean;
  special_class?: string;
  icon?: string;
  sub_items?: Array<NavbarItem>;
}

@Component({
  selector: 'app-navbar-item',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './navbar-items.component.html',
  styleUrls: ['./navbar-items.component.scss'],
})
export class NavbarItemComponent {
  @Input() item: NavbarItem = {
    title: '',
    href: '',
    is_active: true,
    id: '',
  };
  showDropdown = signal(false);
  isItemActive = signal(this.item.is_active);
  isSubItemActive = signal(false);

  displayDropdown() {
    this.showDropdown.set(!this.showDropdown());
  }

  activeItem(item: NavbarItem) {
    this.isItemActive.set(!item.is_active);
  }

  activeSubItem(subItem: NavbarItem) {
    this.isSubItemActive.set(!subItem.is_active);
  }
}
