import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import * as TasksAction from '@core';
import { Label, Person, selectFilteredTasks, Task } from '@core';
import { CreateTaskComponent } from '@feature';
import { Store } from '@ngrx/store';
import { Angular2SmartTableModule, Cell, Settings } from 'angular2-smart-table';
import { TableLabelItemComponent } from '../table-label-item/table-label-item.component';

@Component({
  selector: 'app-table',
  imports: [
    Angular2SmartTableModule,
    CommonModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  settings: Settings = {
    mode: 'external',
    actions: {
      add: false,
      edit: true,
      delete: true,
      position: 'right',
    },
    edit: {
      editButtonContent: `<span class="edit-actions material-icons">edit</span>`,
      sanitizer: { bypassHtml: true },
    },
    delete: {
      deleteButtonContent: `<span class="delete-actions material-icons">delete</span>`,
      sanitizer: { bypassHtml: true },
    },
    selectMode: 'multi',
    hideSubHeader: true,
    hideHeader: true,
    columns: {
      person: {
        title: '',
        type: 'html',
        valuePrepareFunction: (person: Person) => {
          return `<div class="profile"><img src="${person.profile}"></div>`;
        },
      },
      title: {
        title: '',
        type: 'html',
        valuePrepareFunction: (title: string) => {
          return `<div class="title">${title}</div>`;
        },
      },
      labels: {
        title: '',
        type: 'custom',
        renderComponent: TableLabelItemComponent,
        componentInitFunction: (
          component: TableLabelItemComponent,
          cell: Cell
        ) => {
          component.labels = cell.getRawValue() as Label[];
        },
      },
      startDate: {
        title: '',
        type: 'html',
        valuePrepareFunction: (startDate: string) => {
          return `<div class="scheduleDate">Schedule for ${new Date(
            startDate
          ).toLocaleDateString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}</div>`;
        },
      },
    },
  };

  public dialog: MatDialog = inject(MatDialog);
  private destroyRef: DestroyRef = inject(DestroyRef);

  private store: Store = inject(Store);

  filteredTasks$ = this.store.select(selectFilteredTasks);

  tasks = signal<Task[]>([]);

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks(): void {
    this.store.dispatch(TasksAction.loadTasks());
    this.store.dispatch(TasksAction.filterTasks({}));

    this.filteredTasks$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((task) => {
        this.tasks.set(task);
      });
  }

  onAdd(): void {
    this.openModal();
  }

  onEdit(event: any): void {
    this.openModal(event.data);
  }

  onDelete(event: any): void {
    console.log(event);

    if (window.confirm('Are you sure you want to delete this Task?')) {
      // trigger delete event with ngx store
    }
  }

  openModal(task?: Task): void {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '500px',
      data: task ? { ...task } : {},
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          this.loadTasks();
        }
      });
  }
}
