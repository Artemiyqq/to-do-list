import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { UserService } from './user.service';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { TaskDto } from '../models/task-dto.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient, 
              private configService: ConfigService,
              private userService: UserService, ) { }
  
  private tasks: Task[] = [];

  processNewTask(title: string, description: string, dueDate: string) {
    const newTaskDto = this.createTaskDtoObject(title, description, dueDate);
    if (newTaskDto != null){
      this.postTask(newTaskDto).subscribe({
        error: (e) => console.error("Error saving task on backend:", e),
        next: (response) => {
          const newTask = new Task(response.id, title, description, false, new Date(newTaskDto.dueDate), newTaskDto.userId);
          this.tasks.push(newTask)}
      })
    }
    else {
      console.error("There is a problem with processing a new task")
    }
  }

  createTaskDtoObject(title: string, description: string, dueDate: string): TaskDto | null {
    const userId = this.userService.getUserId();
    if (userId != null)
    {
      const taskDto = new TaskDto(title, description, dueDate, userId);
      return taskDto;
    }
    else {
      console.error("There is a problem with the user id.")
      return null;
    }
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  processingGetTaskRequest(userId: number): void{
    this.getTasksRequest(userId).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  getTasksRequest(userId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.configService.getApiBaseUrl()}/api/tasks/${userId}`)
      .pipe(
        map(tasks => tasks.map(task => new Task(task.id, task.title, task.description, task.isCompleted, task.dueDate, task.userId)))
        ); 
  }

  postTask(task: TaskDto) {
    return this.http.post<{id: number}>(`${this.configService.getApiBaseUrl()}/api/tasks`, task);
  }

  toggleTaskCompletionRequest(taskId: number): Observable<number> {
    return this.http.patch<number>(`${this.configService.getApiBaseUrl()}/api/tasks/toggle-completion/${taskId}`, {})
  }

  toggleTaskCompletion(taskId: number): void {
    const index = this.tasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
      this.tasks[index].isCompleted = !this.tasks[index].isCompleted;
    }
    else {
      console.error("An error occured while changing the task status");
    }
  }
}
