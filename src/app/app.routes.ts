import { Routes } from '@angular/router';
import { CompleteComponent } from './features/tasks/complete/complete.component';
import { LabelComponent } from './features/tasks/label/label.component';
import { PriorityComponent } from './features/tasks/priority/priority.component';
import { TaskListComponent } from './features/tasks/task-list/task-list.component';
import { TodayComponent } from './features/tasks/today/today.component';

export const routes: Routes = [
  { path: 'tasks', component: TaskListComponent },
  { path: 'today', component: TodayComponent },
  { path: 'complete', component: CompleteComponent },
  { path: 'label/:label', component: LabelComponent },
  { path: 'priority/:priority', component: PriorityComponent },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
];
