import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tasks',
    loadChildren: () =>
      import('./pages/app-todo-list/app-todo-list.module').then(
        (m) => m.AppTodoListModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/app-dashboard/app-dashboard.module').then(
        (m) => m.AppDashboardModule
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tasks',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
