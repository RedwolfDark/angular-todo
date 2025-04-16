import { Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { TableComponent } from 'src/app/components/table/table.component';

@Component({
  selector: 'app-task-list',
  imports: [TableComponent],
  providers: [provideNativeDateAdapter()],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {}
