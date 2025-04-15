import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTasksComponent } from './delete-tasks.component';

describe('DeleteTasksComponent', () => {
  let component: DeleteTasksComponent;
  let fixture: ComponentFixture<DeleteTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
