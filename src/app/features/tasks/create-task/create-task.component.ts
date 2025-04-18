import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  Inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  Label,
  Person,
  PersonService,
  Priority,
  selectAllPersons,
  Task,
  TaskService,
} from '@core';
import { Store } from '@ngrx/store';
import { map, Observable, of, startWith } from 'rxjs';
import * as PersonAction from '../../../core/state/actions/person.action';

@Component({
  selector: 'app-create-task',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatButtonModule,
    MatAutocompleteModule,
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent {
  taskForm: FormGroup;
  priorities = Object.values(Priority);
  labels = Object.values(Label);
  staff = signal<Person[]>([]);
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  person$ = this.store.select(selectAllPersons);
  filteredStaff$: Observable<Person[]> = of(this.staff());

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private personService: PersonService,
    public dialogRef: MatDialogRef<CreateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {
    this.taskForm = this.fb.group({
      id: [null],
      title: ['', [Validators.required, Validators.minLength(3)]],
      person: [null, Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [null],
      priority: [Priority.MEDIUM, Validators.required],
      labels: [[], Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.loadPersons();
    if (this.data) {
      this.taskForm.patchValue(this.data);
    }
  }

  loadPersons(): void {
    this.store.dispatch(PersonAction.loadPersons());

    this.person$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((person) => {
        this.staff.set(person);
      });

    this.filteredStaff$ = this.taskForm.get('person')!.valueChanges.pipe(
      startWith(''),
      map((value: string) =>
        this.staff().filter((option) =>
          option.name.toLowerCase().includes((value || '').toLowerCase())
        )
      )
    );
  }

  saveTask(): void {
    if (this.taskForm.valid) {
      const Task = this.taskForm.value;
      const personId = Task.person.split('_')[0];
      this.personService.getPerson(personId).subscribe((person) => {
        Task.person = person[0];
        if (Task.id) {
          this.taskService
            .updateTask(Task.id, Task)
            .subscribe((updatedTask: Partial<Task>) => {
              this.dialogRef.close(updatedTask);
            });
        } else {
          Task.id = Math.round(Math.random() * Math.random() * 100);
          this.taskService.createTask(Task).subscribe((newTask: Task) => {
            this.dialogRef.close(newTask);
          });
        }
      });
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
