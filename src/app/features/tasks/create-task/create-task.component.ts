import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Label, Person, Priority, Task, TaskService } from '@core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-create-task',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatAutocompleteModule,
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent {
  taskForm: FormGroup;
  priorities = Object.values(Priority);
  labels = Object.values(Label);
  persons!: Person[] | undefined;
  filteredPersons: Observable<Person[] | undefined> = of(this.persons);

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
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
    if (this.data) {
      this.taskForm.patchValue(this.data);
    }
  }

  saveTask(): void {
    if (this.taskForm.valid) {
      const Task = this.taskForm.value;
      if (Task.id) {
        this.taskService
          .updateTask(Task.id, Task)
          .subscribe((updatedTask: Partial<Task>) => {
            this.dialogRef.close(updatedTask);
          });
      } else {
        this.taskService.createTask(Task).subscribe((newTask: Task) => {
          this.dialogRef.close(newTask);
        });
      }
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  filterPersons(value: string): void {
    const filterValue = value.toLowerCase();
    this.filteredPersons = of(
      this.persons
        ? this.persons.filter((person) =>
            person.name.toLowerCase().includes(filterValue)
          )
        : undefined
    );
  }

  getPersonName(person: Person): string {
    return person ? person.name : '';
  }
}
