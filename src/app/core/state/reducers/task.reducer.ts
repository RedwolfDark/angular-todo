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
  return (Object.values(Label) as Array<string>).includes(value)
    ? (value as Priority)
    : undefined;
};

export const convertStringToStatusEnum = (
  value: string
): Status | undefined => {
  return (Object.values(Label) as Array<string>).includes(value)
    ? (value as Status)
    : undefined;
};

export const initialState: TaskState = {
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
    console.log('Filter tasks');

    if (filters == undefined) {
      return {
        ...state,
        tasks: state.tasks,
      };
    }

    const filtered = state.tasks.filter((task) => {
      const matchesStartDate =
        !filters.startDate || task.startDate === filters.startDate;

      const matchesEndDate =
        !filters.endDate || task.endDate === filters.endDate;

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
