import { createReducer, on } from '@ngrx/store';
import * as PersonActions from '../actions/person.action';
import { PersonState } from '../person.state';

const initialState: PersonState = {
  persons: [],
  filteredPersons: [],
  loading: false,
  error: null,
};

export const personReducer = createReducer(
  initialState,
  on(PersonActions.loadPersons, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PersonActions.loadPersonsSuccess, (state, { persons }) => ({
    ...state,
    persons,
    filteredPersons: persons,
    loading: false,
  })),
  on(PersonActions.loadPersonsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(PersonActions.filterPersons, (state, { filters }) => {
    if (filters == undefined) {
      return {
        ...state,
        filteredPersons: state.persons,
      };
    }

    const filtered = state.persons.filter((person) => {
      const matchesName =
        !filters.q ||
        person.name.toLowerCase().includes(filters.q.toLowerCase());

      const matchesEmail =
        !filters.q ||
        person.email.toLowerCase().includes(filters.q.toLowerCase());

      return matchesEmail || matchesName;
    });

    return {
      ...state,
      filteredPersons: filtered,
    };
  }),
  on(PersonActions.createPersonSuccess, (state, { person }) => ({
    ...state,
    persons: [...state.persons, person],
    filteredPersons: [...state.filteredPersons, person],
  })),

  on(PersonActions.deletePersonSuccess, (state, { id }) => {
    const updatedPersons = state.persons.filter((person) => person.id !== id);
    return {
      ...state,
      persons: updatedPersons,
      filteredPersons: updatedPersons,
    };
  }),

  on(
    PersonActions.createPersonFailure,
    PersonActions.deletePersonFailure,
    (state, { error }) => ({
      ...state,
      error,
    })
  )
);
