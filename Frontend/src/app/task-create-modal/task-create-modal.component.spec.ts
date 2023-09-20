import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCreateModalComponent } from './task-create-modal.component';

describe('TaskCreateModalComponent', () => {
  let component: TaskCreateModalComponent;
  let fixture: ComponentFixture<TaskCreateModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskCreateModalComponent]
    });
    fixture = TestBed.createComponent(TaskCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
