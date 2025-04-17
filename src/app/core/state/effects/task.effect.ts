import { Injectable } from '@angular/core';
import { TaskService } from '@core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as TaskActions from '../actions/tasks.action';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private taskService: TaskService) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          map((tasks) => TaskActions.loadTasksSuccess({ tasks })),
          catchError((err) =>
            of(TaskActions.loadTasksFailure({ error: err.message }))
          )
        )
      )
    )
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.createTask),
      mergeMap(({ task }) =>
        this.taskService.createTask(task).pipe(
          map((createdTask) =>
            TaskActions.createTaskSuccess({ task: createdTask })
          ),
          catchError((err) =>
            of(TaskActions.createTaskFailure({ error: err.message }))
          )
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      mergeMap(({ id }) =>
        this.taskService.deleteTask(id).pipe(
          map(() => TaskActions.deleteTaskSuccess({ id })),
          catchError((err) =>
            of(TaskActions.deleteTaskFailure({ error: err.message }))
          )
        )
      )
    )
  );
}
