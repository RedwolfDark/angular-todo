import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-item',
  standalone: true,
  imports: [CommonModule],
  template: './navbar-items.component.html',
  styleUrls: ['./navbar-items.component.css'],
})
export class NavbarItemComponent {
  @Input() item: { label: string; value: string } = { label: '', value: '' };
}
