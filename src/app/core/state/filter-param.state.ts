import { signal } from '@angular/core';
import { Task } from '@core';

export const param = signal<Partial<Task> | undefined>(undefined);
