import { Component } from '@angular/core';
import { TableComponent } from '@component';

@Component({
  selector: 'app-task-list',
  imports: [TableComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  ngOnInit() {
    console.log('task list');
  }
}
