import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTodoListComponent } from './app-todo-list.component';
import { RouterModule } from '@angular/router';

const appComponents = [AppTodoListComponent];
const ngxModules = [CommonModule];

@NgModule({
  declarations: [...appComponents],
  imports: [
    ...ngxModules,
    RouterModule.forChild([{ path: '', component: AppTodoListComponent }]),
  ],
  exports: [...appComponents],
})
export class AppTodoListModule {}