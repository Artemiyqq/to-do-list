import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskDetailModalService } from '../services/task-detail-modal.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-detail-modal',
  templateUrl: './task-detail-modal.component.html',
  styleUrls: ['./task-detail-modal.component.css']
})

export class TaskDetailModalComponent implements OnInit {
  selectedTask: Task | null = null;

  constructor(private taskDetailModalService: TaskDetailModalService,
              public taskService: TaskService) {}

  ngOnInit(): void {
    this.taskDetailModalService.getSelectedTask().subscribe(task => {
      if (task) {
        this.selectedTask = { ...task };
      } else {
        this.selectedTask = null;
      }
    });
  }

  deleteTask(): void {
    this.taskService.deleteTask(this.selectedTask!.id);
    this.taskService.processDeleteTaskRequest(this.selectedTask!.id);
    this.closeModal();
  }

  saveChanges(): void {
    this.taskService.changeTask(this.selectedTask!);
    this.taskService.processPutTaskRequest(this.selectedTask!);
    this.closeModal();
  }

  cancel(): void {
    this.closeModal();
  }

  private closeModal(): void {
    this.selectedTask = null;
    this.taskDetailModalService.closeModal();
  }
}
