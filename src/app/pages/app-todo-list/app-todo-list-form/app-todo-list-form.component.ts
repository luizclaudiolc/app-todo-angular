import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../shared/services/tasks.service';
import { ITask } from '../../shared/interfaces/task.interface';

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
    @Inject(MAT_DIALOG_DATA) public data: { task: ITask }
  ) {
    if (data && data.task) {
      this.task = { ...data.task };
      this.editMode = true;
    }
  }

  ngOnInit(): void {
    if (this.data.task) this.task = { ...this.data.task };
    console.log(this.task);
  }

  private addTask(): void {
    const task: ITask = { ...this.task, done: false };
    console.log('ADD', task);

    this.serviceTask.createTask(task).subscribe();
    this.dialogRef.close();

    /* .subscribe(
      (task) => {
        console.log(task);

        // this.snackBar.open('Aluno adicionado com sucesso!', 'Fechar', {
        //   duration: 2000,
        // });
      },
      (error) => {
        console.error('Erro ao atualizar tarefa', error);
      }
    ); */
  }

  private updateTask(id: number): void {
    console.log('EDIT', this.task);

    this.serviceTask.updateTask(id, this.task).subscribe({
      next: (task) => {
        console.log(task);
        this.dialogRef.close();
        // this.snackBar.open('Tarefa Atualizada!', 'Fechar', {
        //   duration: 2000,
        // });
      },
      error: () => {},
    });
    /* () => {
        // this.snackBar.open('Aluno Atualizado com sucesso!', 'Fechar', {
        //   duration: 2000,
        // });
      },
      (error: any) => {
        console.error('Erro ao atualizar tarefa', error);
      }
    ); */
  }

  addOurEditTask(): void {
    if (this.editMode) {
      this.updateTask(this.task.id);
    } else {
      this.addTask();
    }
  }

  verifyInputs(): boolean {
    return this.task.title !== '' && this.task.body !== '';
  }

  closeDialog(): void {
    this.dialogRef.close(this.task);
  }
}
