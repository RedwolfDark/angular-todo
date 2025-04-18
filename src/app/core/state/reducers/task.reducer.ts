import { createReducer, on } from '@ngrx/store';
import { Label, Priority, Status } from '../../models/task.model';
import * as TaskActions from '../actions/tasks.action';
import { TaskState } from '../task.state';

export const convertStringToLabelEnum = (value: string): Label | undefined => {
  return (Object.values(Label) as Array<string>).includes(value)
    ? (value as Label)
    : undefined;
};

export const convertStringToPriorityEnum = (
  value: string
): Priority | undefined => {
  return (Object.values(Priority) as Array<string>).includes(value)
    ? (value as Priority)
    : undefined;
};

export const convertStringToStatusEnum = (
  value: string
): Status | undefined => {
  return (Object.values(Status) as Array<string>).includes(value)
    ? (value as Status)
    : undefined;
};

const initialState: TaskState = {
  tasks: [],
  filteredTasks: [],
  loading: false,
  error: null,
};

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    filteredTasks: tasks,
    loading: false,
  })),
  on(TaskActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(TaskActions.filterTasks, (state, { filters }) => {
    if (filters == undefined) {
      return {
        ...state,
        filteredTasks: state.tasks,
      };
    }

    const filtered = state.tasks.filter((task) => {
      const matchesStartDate =
        !filters.startDate ||
        (new Date(task.startDate).getFullYear() ===
          new Date(filters.startDate).getFullYear() &&
          new Date(task.startDate).getMonth() ===
            new Date(filters.startDate).getMonth() &&
          new Date(task.startDate).getDate() ===
            new Date(filters.startDate).getDate());

      const matchesEndDate =
        !filters.endDate ||
        (new Date(task.endDate ?? task.startDate).getFullYear() ===
          new Date(filters.endDate).getFullYear() &&
          new Date(task.endDate ?? task.startDate).getMonth() ===
            new Date(filters.endDate).getMonth() &&
          new Date(task.endDate ?? task.startDate).getDate() ===
            new Date(filters.endDate).getDate());

      const matchesPriority =
        !filters.priority ||
        task.priority === convertStringToPriorityEnum(filters.priority);

      const matchesStatus =
        !filters.status ||
        task.status === convertStringToStatusEnum(filters.status);

      const matchesLabel =
        !filters.label ||
        (convertStringToLabelEnum(filters.label) != undefined
          ? task.labels.includes(
              convertStringToLabelEnum(filters.label) as Label
            )
          : false);

      const matchesTitle =
        !filters.title ||
        task.title.toLowerCase().includes(filters.title.toLowerCase());

      return (
        (matchesStartDate || matchesEndDate) &&
        matchesStatus &&
        matchesPriority &&
        matchesLabel &&
        matchesTitle
      );
    });

    return {
      ...state,
      filteredTasks: filtered,
    };
  }),
  on(TaskActions.createTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
    filteredTasks: [...state.filteredTasks, task],
  })),

  on(TaskActions.deleteTaskSuccess, (state, { id }) => {
    const updatedTasks = state.tasks.filter((task) => task.id !== id);
    return {
      ...state,
      tasks: updatedTasks,
      filteredTasks: updatedTasks,
    };
  }),

  on(
    TaskActions.createTaskFailure,
    TaskActions.deleteTaskFailure,
    (state, { error }) => ({
      ...state,
      error,
    })
  )
);
