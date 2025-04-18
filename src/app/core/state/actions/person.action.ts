import { Person } from '@core';
import { createAction, props } from '@ngrx/store';

export const createPerson = createAction(
  '[Person] Create Person',
  props<{ person: Person }>()
);
export const createPersonSuccess = createAction(
  '[Person] Create Person Success',
  props<{ person: Person }>()
);
export const createPersonFailure = createAction(
  '[Person] Create Person Failure',
  props<{ error: string }>()
);

export const deletePerson = createAction(
  '[Person] Delete Person',
  props<{ id: number }>()
);
export const deletePersonSuccess = createAction(
  '[Person] Delete Person Success',
  props<{ id: number }>()
);
export const deletePersonFailure = createAction(
  '[Person] Delete Person Failure',
  props<{ error: string }>()
);

export const loadPersons = createAction('[Person] Loading Persons');
export const loadPersonsSuccess = createAction(
  '[Person] Load Persons Success',
  props<{ persons: Person[] }>()
);
export const loadPersonsFailure = createAction(
  '[Person] Load Persons Failure',
  props<{ error: string }>()
);

export const filterPersons = createAction(
  '[Person] Filter Persons',
  props<{
    filters?: {
      q?: string;
    };
  }>()
);
