import { Task } from '@core';

export interface TaskState {
  tasks: Task[];
  filteredTasks: Task[];
  loading: boolean;
  error: string | null;
}
