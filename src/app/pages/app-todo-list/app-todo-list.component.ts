import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';
import { ITask } from '../shared/interfaces/task.interface';
import { TasksService } from '../shared/services/tasks.service';
import { AppTodoListFormComponent } from './app-todo-list-form/app-todo-list-form.component';
import { SNACK_DEFAULT } from 'src/app/utils/app-utils';

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

  constructor(
    private taskService: TasksService,
    public dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService
      .getTasks()
      .pipe(
        tap({
          next: (tasks: ITask[]) => {
            this.tasks = tasks.sort((a, b) => +a.done - +b.done);
            this.update();
          },
        })
      )
      .subscribe();
  }

  searchTask(event: any): void {
    const toLowerCase = (value: string) => value.toLocaleLowerCase();
    const text = toLowerCase(event.target.value.trim());
    const dataFiltered = this.tasks.filter(({ title, body }) => {
      return (
        toLowerCase(title).includes(text) || toLowerCase(body).includes(text)
      );
    });
    this.tasksInPage = dataFiltered;
  }

  openDialog(task?: ITask): void {
    const dialogRef = this.dialog.open(AppTodoListFormComponent, {
      width: `${window.screen.width * 0.8}px`,
      height: `${window.screen.height * 0.45}px`,
      autoFocus: true,
      data: task,
    });

    dialogRef.afterClosed().subscribe(() => this.getTasks());
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

  pageEvents({ pageIndex, pageSize }: PageEvent): void {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.update();
  }

  update(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.tasksInPage = this.tasks.slice(start, end);
  }

  toggleDone(task: ITask) {
    this.taskService.updateTask(task.id, task).subscribe({
      next: (task) => {
        this.snack.open('Tarefa Atualizada!', 'x', SNACK_DEFAULT);
        this.getTasks();
      },
      error: (error) =>
        console.error('A tarefa não pode ser atualizada no menomento.', error),
    });
  }
}
