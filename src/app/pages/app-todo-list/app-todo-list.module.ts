import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTodoListComponent } from './app-todo-list.component';

const appComponents = [AppTodoListComponent];
const ngxModules = [CommonModule];

@NgModule({
  declarations: [...appComponents],
  imports: [...ngxModules],
  exports: [...appComponents],
})
export class AppTodoListModule {}
