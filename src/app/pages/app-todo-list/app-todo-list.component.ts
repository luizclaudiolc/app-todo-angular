import { Component, OnInit } from '@angular/core';
import { TasksService } from '../shared/services/tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { ITask } from '../shared/interfaces/task.interface';
import { AppTodoListFormComponent } from './app-todo-list-form/app-todo-list-form.component';

@Component({
  selector: 'app-app-todo-list',
  templateUrl: './app-todo-list.component.html',
  styleUrls: ['./app-todo-list.component.scss'],
})
export class AppTodoListComponent implements OnInit {
  tasks: ITask[] = [];
  columnsTable: string[] = ['done', 'title', 'body', 'actions'];
  columnsTableHeader: string[] = ['Feito', 'Tarefa', 'Descrição', 'Ações'];
  tasksInPage: ITask[] = [];
  lowValue: number = 0;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private taskService: TasksService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService
      .getTasks()
      .pipe(
        tap({
          next: (tasks: ITask[]) => {
            this.tasks = tasks;
            this.update();
          },
        })
      )
      .subscribe();
  }

  searchTask(event: any): void {
    const text = event.target.value.trim().toLowerCase();
    const dataFiltered = this.tasks.filter(({ id, title, body }) => {
      return (
        String(id).toLowerCase().includes(text) ||
        title.toLowerCase().includes(text) ||
        body.toString().includes(text)
      );
    });
    this.tasksInPage = dataFiltered;
  }

  openDialog(task?: ITask): void {
    const dialogRef = this.dialog.open(AppTodoListFormComponent, {
      width: '550px',
      autoFocus: true,
      data: { task },
    });

    dialogRef.afterClosed().subscribe((result) => this.getTasks());
  }

  update(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.tasksInPage = this.tasks.slice(start, end);
  }

  deleteTask(task: ITask): void {
    const { id: _id, title } = task;
    const deleteConfirm = window.confirm(
      `Tem certeza que quer excluir a tarefa: ${title}`
    );

    if (deleteConfirm) {
      this.taskService.deleteTask(_id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(({ id }) => id !== _id);
          this.getTasks();
        },
      });
    }
  }
}
