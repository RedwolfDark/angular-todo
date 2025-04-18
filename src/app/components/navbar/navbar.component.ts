import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '@core';
import { CreateTaskComponent } from '@feature';
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
  dialog = inject(MatDialog);
  destroyRef = inject(DestroyRef);
  showMenu = this._showMenu.asReadonly();

  menuItems = MENUITEMS;

  toggleMenu() {
    this._showMenu.update((show) => !show);
  }

  openModal(task?: Task): void {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '60%',
      panelClass: 'custom-modal-box',
      data: task ? { ...task } : {},
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          console.log(result);
        }
      });
  }
}
