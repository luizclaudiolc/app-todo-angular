import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AppTodoListFormComponent } from './app-todo-list-form.component';

const appComponent = [AppTodoListFormComponent];
const ngxModules = [CommonModule];
const ngModules = [
  FormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
];

@NgModule({
  declarations: [...appComponent],
  imports: [...ngxModules, ...ngModules],
  exports: [...appComponent],
})
export class AppTodoListFormModule {}
