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
          const newTask = new Task(response.id, title, description, false, new Date(newTaskDto.dueDate!), newTaskDto.userId!);
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
      this.tasks = tasks.sort((a, b) => b.id - a.id);
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

  changeTask(changedTask: Task): void {
    const index = this.tasks.findIndex(t => t.id === changedTask.id);
    if (index !== -1) {
      this.tasks[index] = changedTask;
    } else {
      console.error("An erro occured while changing the task data");
    }
  }

  getMinDueDateForNewTask(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  processPutTaskRequest(changedTask: Task){
    const changedTaskDto = this.createTaskDtoObject(changedTask.title,
                                                    changedTask.description,
                                                    changedTask.dueDate.toString());
    if (changedTaskDto != null){
      this.putTaskRequest(changedTask.id, changedTaskDto).subscribe({
        error: (e) => console.error('Error updating task', e)   
    });
    } else {
      console.error("There is a problem with processing changed task");
    }
  }

  putTaskRequest(changedTaskId: number, changedTaskDto: TaskDto): Observable<any> {
    return this.http.put<any>(`${this.configService.getApiBaseUrl()}/api/tasks/${changedTaskId}`,
                              changedTaskDto);
  }

  processDeleteTaskRequest(taskId: number): void {
    this.deleteTaskRequest(taskId).subscribe({
      error: (e) => console.error('Error deleting task', e)
    });
  }

  deleteTask(taskId: number): void {
    const index = this.tasks.findIndex(t => t.id === taskId);
    this.tasks.splice(index, 1);
  }

  deleteTaskRequest(taskId: number): Observable<any> {
    return this.http.delete<any>(`${this.configService.getApiBaseUrl()}/api/tasks/${taskId}`);
  }
}
