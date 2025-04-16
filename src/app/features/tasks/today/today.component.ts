import { Component, signal } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Task } from '@core';

import { TableComponent } from 'src/app/components/table/table.component';

@Component({
  selector: 'app-today',
  imports: [TableComponent],
  providers: [provideNativeDateAdapter()],
  templateUrl: './today.component.html',
  styleUrl: './today.component.scss',
})
export class TodayComponent {
  param = signal<Partial<Task>>({});

  ngOnInit(): void {
    this.param.set({ startDate: new Date().toString() });
  }
}
