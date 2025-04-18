import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PersonState } from '../person.state';

export const selectPersonState = createFeatureSelector<PersonState>('persons');

export const selectAllPersons = createSelector(
  selectPersonState,
  (state) => state.persons
);

export const selectFilteredPersons = createSelector(
  selectPersonState,
  (state) => state.filteredPersons
);

export const selectPersonLoading = createSelector(
  selectPersonState,
  (state) => state.loading
);

export const selectPersonError = createSelector(
  selectPersonState,
  (state) => state.error
);
