import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../shared/services/tasks.service';
import { ITask } from '../../shared/interfaces/task.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACK_DEFAULT } from 'src/app/utils/app-utils';

@Component({
  selector: 'app-app-todo-list-form',
  templateUrl: './app-todo-list-form.component.html',
  styleUrls: ['./app-todo-list-form.component.scss'],
})
export class AppTodoListFormComponent implements OnInit {
  task: any = {};
  editMode = false;

  constructor(
    private serviceTask: TasksService,
    private dialogRef: MatDialogRef<AppTodoListFormComponent>,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { task: ITask }
  ) {
    if (data && data.task) {
      this.task = { ...data.task };
      this.editMode = true;
    }
  }

  ngOnInit(): void {
    if (this.data.task) this.task = { ...this.data.task };
  }

  private addTask(): void {
    const task: ITask = { ...this.task, done: false };
    this.serviceTask.createTask(task).subscribe({
      next: (task) => {
        this.dialogRef.close();
        this.snack.open('Tarefa criada!', 'x', SNACK_DEFAULT);
      },
      error: (error) =>
        console.error('A tarefa não pode ser criada no menomento.', error),
    });
  }

  private updateTask(id: number): void {
    this.serviceTask.updateTask(id, this.task).subscribe({
      next: (task) => {
        this.dialogRef.close();
        this.snack.open('Tarefa Atualizada!', 'x', SNACK_DEFAULT);
      },
      error: (error) =>
        console.error('A tarefa não pode ser atualizada no menomento.', error),
    });
  }

  addOurEditTask(): void {
    this.editMode ? this.updateTask(this.task.id) : this.addTask();
  }

  verifyInputs(): boolean {
    return this.task.title && this.task.body;
  }

  closeDialog(): void {
    this.dialogRef.close(this.task);
  }
}
