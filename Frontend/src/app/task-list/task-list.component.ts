import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {


  constructor(private taskService: TaskService, private userService: UserService) {}

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
    return this.taskService.getTasks();
  }
}
