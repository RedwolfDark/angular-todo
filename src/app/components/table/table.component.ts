import { Component, DestroyRef, Input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Label, Person, Task, TaskService } from '@core';
import { CreateTaskComponent } from '@feature';
import { Angular2SmartTableModule, Settings } from 'angular2-smart-table';
import { TableLabelItemComponent } from '../table-label-item/table-label-item.component';

@Component({
  selector: 'app-table',
  imports: [Angular2SmartTableModule, MatDatepickerModule, MatFormFieldModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  settings: Settings = {
    actions: {
      add: false,
      edit: true,
      delete: true,
      position: 'left',
    },
    edit: { editButtonContent: '' },
    delete: { deleteButtonContent: '' },
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
        componentInitFunction: (component: TableLabelItemComponent, cell) => {
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

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
    private destroyRef: DestroyRef
  ) {}

  @Input() params?: Partial<Task> = {};

  tasks = signal<Array<Task>>([]);

  ngOnInit(): void {
    this.loadTasks(this.params);
  }

  loadTasks(param?: Partial<Task>): void {
    this.taskService
      .getTasks()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((task) => {
        let tasks = task;
        if (param) {
          tasks = task.filter((t) =>
            Object.entries(param).some(
              ([key, value]) => (t as any)[key] == value
            )
          );
        }
        console.log(tasks);

        this.tasks.set(tasks);
      });
  }

  onAdd(): void {
    this.openModal();
  }

  onEdit(event: any): void {
    this.openModal(event.data);
  }

  onDelete(event: any): void {
    if (window.confirm('Are you sure you want to delete this Task?')) {
      this.taskService
        .deleteTask(event.data.id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.loadTasks();
        });
    }
  }

  openModal(task?: Task): void {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '500px',
      data: task ? { ...task } : {}, // Pass a copy
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
