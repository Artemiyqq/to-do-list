import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskDetailModalService {
  private selectedTaskSubject: BehaviorSubject<Task | null> = new BehaviorSubject<Task | null>(null);

  getSelectedTask(): BehaviorSubject<Task | null> {
    return this.selectedTaskSubject;
  }

  openModal(task: Task): void {
    this.selectedTaskSubject.next(task);
  }

  closeModal(): void {
    this.selectedTaskSubject.next(null);
  }
}
