import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TaskListComponent } from './features/tasks/task-list/task-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-todo';
}
