import { TestBed } from '@angular/core/testing';

import { TaskDetailModalService } from './task-detail-modal.service';

describe('TaskDetailModalService', () => {
  let service: TaskDetailModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskDetailModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
