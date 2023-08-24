import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDashboardComponent } from './app-dashboard.component';

const appComponents = [AppDashboardComponent];
const ngxModules = [CommonModule];

@NgModule({
  declarations: [...appComponents],
  imports: [...ngxModules],
  exports: [...appComponents],
})
export class AppDashboardModule {}
