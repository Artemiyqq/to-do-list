import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';
import { TopPanelService } from '../services/top-panel.service';
import { TaskDetailModalService } from '../services/task-detail-modal.service';
import { TaskDetailModalComponent } from '../task-detail-modal/task-detail-modal.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, AfterViewInit {
  @ViewChild(TaskDetailModalComponent) taskDetailModalComponent: TaskDetailModalComponent | undefined
  selectedTask: Task = {
    id: -1,
    title: '',
    description: '',
    isCompleted: false,
    dueDate: new Date(),
    userId: -1
  };

  constructor(private taskService: TaskService,
              private userService: UserService,
              public topPanelService: TopPanelService,
              private taskDetailModalService: TaskDetailModalService,
              private cdr: ChangeDetectorRef) {}
  
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    const userId = this.userService.getUserId();
    if (userId != null) {
      this.taskService.processingGetTaskRequest(userId);
    } else {
      console.error("There is a problem with the user id.");
    }
  }

  getTasksToListComponent(): Task[] {
    if (this.topPanelService.getActiveCategory() === 'All') {
      return this.taskService.getTasks();
    } else if (this.topPanelService.getActiveCategory() === 'Not Completed') {
      return this.taskService.getTasks().filter(task => !task.isCompleted);
    } else {
      return this.taskService.getTasks().filter(task => task.isCompleted);
    } 
  }


  handleTaskClick(task: Task): void {
    this.selectedTask = task;
    this.taskDetailModalService.openModal(task);
  }

  closeModal(): void {
    if (this.taskDetailModalComponent) {
      this.taskDetailModalComponent.selectedTask = null;
    }
  }

  handleImageClick(event: Event, taskId: number): void {
    event.stopPropagation();
    this.taskService.toggleTaskCompletionRequest(taskId)
      .subscribe(changedTaskId => {
        this.taskService.toggleTaskCompletion(changedTaskId);
      });
  }
}
