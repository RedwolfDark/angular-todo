import { Task } from '@core';
import { createAction, props } from '@ngrx/store';

export const createTask = createAction(
  '[Task] Create Task',
  props<{ task: Task }>()
);
export const createTaskSuccess = createAction(
  '[Task] Create Task Success',
  props<{ task: Task }>()
);
export const createTaskFailure = createAction(
  '[Task] Create Task Failure',
  props<{ error: string }>()
);

export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ id: number }>()
);
export const deleteTaskSuccess = createAction(
  '[Task] Delete Task Success',
  props<{ id: number }>()
);
export const deleteTaskFailure = createAction(
  '[Task] Delete Task Failure',
  props<{ error: string }>()
);

export const loadTasks = createAction('[Task] Loading Tasks');
export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: Task[] }>()
);
export const loadTasksFailure = createAction(
  '[Task] Load Tasks Failure',
  props<{ error: string }>()
);

export const filterTasks = createAction(
  '[Task] Filter Tasks',
  props<{
    filters?: {
      startDate?: string;
      person?: string;
      endDate?: string;
      priority?: string;
      label?: string;
      title?: string;
      status?: string;
    };
  }>()
);
