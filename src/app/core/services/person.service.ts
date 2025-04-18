import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private apiUrl = `${environment.apiUrl}/persons`;

  private http: HttpClient = inject(HttpClient);

  getPersons(): Observable<Person[]> {
    console.log('Service called');

    return this.http.get<Person[]>(this.apiUrl);
  }

  getPerson(id: number): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.apiUrl}?id=${id}`);
  }

  createPerson(Person: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, Person);
  }

  updatePerson(id: number, Person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.apiUrl}?id=${id}`, Person);
  }

  deletePerson(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?id=${id}`);
  }
}
