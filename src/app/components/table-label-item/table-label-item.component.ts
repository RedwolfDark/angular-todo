import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Label, LabelColorMap } from '@core';

@Component({
  selector: 'app-table-label-item',
  imports: [CommonModule, MatIconModule],
  templateUrl: './table-label-item.component.html',
  styleUrl: './table-label-item.component.scss',
})
export class TableLabelItemComponent {
  @Input() labels: Array<Label> = [];

  labelColorMap = LabelColorMap;
}
