import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from '../interfaces/task.interface';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${environment.endpoint}/all`);
  }

  createTask(task: ITask): Observable<ITask> {
    console.log(task);

    return this.http.post<ITask>(`${environment.endpoint}/create`, task);
  }

  getTask(taskId: number): Observable<ITask> {
    return this.http.get<ITask>(`${environment.endpoint}/${taskId}`);
  }

  updateTask(taskId: number, task: ITask): Observable<ITask> {
    return this.http.put<ITask>(`${environment.endpoint}/edit/${taskId}`, task);
  }

  deleteTask(taskId: number): Observable<ITask> {
    return this.http.delete<ITask>(`${environment.endpoint}/${taskId}`);
  }
}
