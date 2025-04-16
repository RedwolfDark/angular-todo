import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLabelItemComponent } from './table-label-item.component';

describe('TableLabelItemComponent', () => {
  let component: TableLabelItemComponent;
  let fixture: ComponentFixture<TableLabelItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableLabelItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableLabelItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
