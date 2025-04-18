import { Person } from '@core';

export interface PersonState {
  persons: Person[];
  filteredPersons: Person[];
  loading: boolean;
  error: string | null;
}
