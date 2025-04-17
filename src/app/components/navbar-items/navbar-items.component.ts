import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { filterTasks, Label, Priority, Status } from '@core';
import { Store } from '@ngrx/store';

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
  private store: Store = inject(Store);

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
        this.store.dispatch(
          filterTasks({ filters: { status: Status.COMPLETED } })
        );
        break;
      case 'all':
        this.store.dispatch(filterTasks({}));
        break;
      case 'today':
        const date = new Date();
        this.store.dispatch(
          filterTasks({
            filters: {
              startDate: `${date.getFullYear()}-${
                date.getMonth() + 1
              }-${date.getDate()}`,
            },
          })
        );
        break;
      case Priority.HIGH:
        this.store.dispatch(filterTasks({ filters: { priority: id } }));
        break;
      case Priority.LOW:
        this.store.dispatch(filterTasks({ filters: { priority: id } }));
        break;
      case Priority.MEDIUM:
        this.store.dispatch(filterTasks({ filters: { priority: id } }));
        break;
      case Label.CSS:
        this.store.dispatch(filterTasks({ filters: { label: id } }));
        break;
      case Label.HTML:
        this.store.dispatch(filterTasks({ filters: { label: id } }));
        break;
      case Label.JQUERY:
        this.store.dispatch(filterTasks({ filters: { label: id } }));
        break;
      case Label.NODE_JS:
        this.store.dispatch(filterTasks({ filters: { label: id } }));
        break;

      default:
        break;
    }
  }
}
