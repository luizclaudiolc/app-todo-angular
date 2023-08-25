import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { AppTodoListFormModule } from './app-todo-list-form/app-todo-list-form.module';
import { AppTodoListComponent } from './app-todo-list.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const appComponents = [AppTodoListComponent];
const appModules = [AppTodoListFormModule];
const ngxModules = [CommonModule];
const NgModules = [
  MatFormFieldModule,
  MatIconModule,
  FormsModule,
  MatPaginatorModule,
  MatDialogModule,
  MatTableModule,
  MatSelectModule,
  MatInputModule,
  MatListModule,
  MatDividerModule,
  MatButtonModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [...appComponents],
  imports: [
    RouterModule.forChild([{ path: '', component: AppTodoListComponent }]),
    ...ngxModules,
    ...NgModules,
  ],
  exports: [...appComponents],
})
export class AppTodoListModule {}
