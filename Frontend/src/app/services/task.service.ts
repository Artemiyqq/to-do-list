import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];

  constructor(private userService: UserService) { }

  createTask(title: string, description: string, dueDate: string): void {
    const task = new Task();
    task.title = title;
    task.description = description;
    task.dueDate = new Date(dueDate);
    
    const userId = this.userService.getUserId();
    if (userId != null)
    {
      task.userId = userId;
    }
    else {
      console.error("There is a problem with the user id. Cannot save new task.")
    }

    this.tasks.push(task);
  }

  getTasks(): Task[] {
    return this.tasks;
  }
}
