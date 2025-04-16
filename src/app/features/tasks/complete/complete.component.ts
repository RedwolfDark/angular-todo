import { Component, OnInit, signal } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Status, Task } from '@core';

import { TableComponent } from 'src/app/components/table/table.component';

@Component({
  selector: 'app-complete',
  imports: [TableComponent],
  providers: [provideNativeDateAdapter()],
  templateUrl: './complete.component.html',
  styleUrl: './complete.component.scss',
})
export class CompleteComponent implements OnInit {
  param = signal<Partial<Task>>({});

  ngOnInit(): void {
    this.param.set({ status: Status.COMPLETED });
  }
}
