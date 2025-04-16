import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Label, param, Priority, Status } from '@core';

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
    this.editState(item.id);
  }

  activeSubItem(subItem: NavbarItem) {
    this.isSubItemActive.set(!subItem.is_active);
    this.editState(subItem.id);
  }

  editState(id: string) {
    switch (id) {
      case 'complete':
        param.set({ status: Status.COMPLETED });
        break;
      case 'all':
        param.set(undefined);
        break;
      case 'today':
        const date = new Date();
        param.set({
          startDate: `${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()}`,
        });
        break;
      case Priority.HIGH:
        param.set({ priority: id });
        break;
      case Priority.LOW:
        param.set({ priority: id });
        break;
      case Priority.MEDIUM:
        param.set({ priority: id });
        break;
      case Label.CSS:
        param.set({ labels: [id] });
        break;
      case Label.HTML:
        param.set({ labels: [id] });
        break;
      case Label.JQUERY:
        param.set({ labels: [id] });
        break;
      case Label.NODE_JS:
        param.set({ labels: [id] });
        break;

      default:
        break;
    }
  }
}
