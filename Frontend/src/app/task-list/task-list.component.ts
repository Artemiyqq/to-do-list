import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';
import { TopPanelService } from '../services/top-panel.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  constructor(private taskService: TaskService,
              private userService: UserService,
              private topPanelService: TopPanelService) {}

  ngOnInit(): void {
    const userId = this.userService.getUserId();
    if (userId != null) {
      this.taskService.processingGetTaskRequest(userId);
    }
    else
    {
      console.error("There is a problem with the user id.")
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

  handleImageClick(taskId: number): void {
    this.taskService.toggleTaskCompletionRequest(taskId)
      .subscribe(changedTaskId => {
        this.taskService.toggleTaskCompletion(changedTaskId);
      });
  }
}
