import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-create-modal',
  templateUrl: './task-create-modal.component.html',
  styleUrls: ['./task-create-modal.component.css']
})
export class TaskCreateModalComponent {
  @Input() isVisible: boolean = false;

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() createTaskEvent = new EventEmitter<Task>();

  constructor(private taskService: TaskService) {}

  closeTaskModal() {
    this.closeModalEvent.emit();
  }

  createTask(taskName: string, taskDescription: string, dueDate: string) {
    this.taskService.createTask(taskName, taskDescription, dueDate)
    this.closeTaskModal();
  }

  getMinDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
