import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDashboardComponent } from './app-dashboard.component';
import { RouterModule } from '@angular/router';

const appComponents = [AppDashboardComponent];
const ngxModules = [CommonModule];

@NgModule({
  declarations: [...appComponents],
  imports: [
    ...ngxModules,
    RouterModule.forChild([{ path: '', component: AppDashboardComponent }]),
  ],
  exports: [...appComponents],
})
export class AppDashboardModule {}
