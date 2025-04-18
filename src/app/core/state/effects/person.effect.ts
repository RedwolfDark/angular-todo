import { inject, Injectable } from '@angular/core';
import { PersonService } from '@core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as PersonActions from '../actions/person.action';

@Injectable()
export class PersonEffects {
  private actions$: Actions = inject(Actions);
  private PersonService: PersonService = inject(PersonService);

  loadPersons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PersonActions.loadPersons),
      mergeMap(() =>
        this.PersonService.getPersons().pipe(
          map((persons) => PersonActions.loadPersonsSuccess({ persons })),
          catchError((err) =>
            of(PersonActions.loadPersonsFailure({ error: err.message }))
          )
        )
      )
    )
  );

  createPerson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PersonActions.createPerson),
      mergeMap(({ person }) =>
        this.PersonService.createPerson(person).pipe(
          map((createdPerson) =>
            PersonActions.createPersonSuccess({ person: createdPerson })
          ),
          catchError((err) =>
            of(PersonActions.createPersonFailure({ error: err.message }))
          )
        )
      )
    )
  );

  deletePerson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PersonActions.deletePerson),
      mergeMap(({ id }) =>
        this.PersonService.deletePerson(id).pipe(
          map(() => PersonActions.deletePersonSuccess({ id })),
          catchError((err) =>
            of(PersonActions.deletePersonFailure({ error: err.message }))
          )
        )
      )
    )
  );
}
