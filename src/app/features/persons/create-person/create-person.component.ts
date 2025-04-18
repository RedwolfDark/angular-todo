import { CommonModule } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
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
import { Person, PersonService } from '@core';

@Component({
  selector: 'app-create-person',
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
  templateUrl: './create-person.component.html',
  styleUrl: './create-person.component.scss',
})
export class CreatePersonComponent {
  personForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    public dialogRef: MatDialogRef<CreatePersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Person
  ) {
    this.personForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: [null, Validators.required],
      phone: [new Date(), Validators.required],
      profile: [null],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.personForm.patchValue(this.data);
    }
  }

  savePerson(): void {
    if (this.personForm.valid) {
      const Person = this.personForm.value;
      if (Person.id) {
        this.personService
          .updatePerson(Person.id, Person)
          .subscribe((updatedPerson: Partial<Person>) => {
            this.dialogRef.close(updatedPerson);
          });
      } else {
        const id = Math.round(Math.random() * Math.random() * 100);
        Person.id = id;
        Person.profile = `https://i.pravatar.cc/30?img=${id}`;
        this.personService
          .createPerson(Person)
          .subscribe((newPerson: Person) => {
            this.dialogRef.close(newPerson);
          });
      }
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
