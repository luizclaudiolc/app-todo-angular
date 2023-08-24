import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-app-todo-list',
  templateUrl: './app-todo-list.component.html',
  styleUrls: ['./app-todo-list.component.scss'],
})
export class AppTodoListComponent implements OnInit {
  constructor(private taskService: TasksService) {}

  ngOnInit(): void {
    this.taskService
      .getTasks()
      .pipe(
        tap({
          next: (tasks) => {
            console.log(tasks);
          },
        })
      )
      .subscribe();
  }
}
