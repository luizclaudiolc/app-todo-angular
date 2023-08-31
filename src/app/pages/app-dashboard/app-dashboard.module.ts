import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NgxGaugeModule } from 'ngx-gauge';
import { AppDashboardComponent } from './app-dashboard.component';

const appComponents = [AppDashboardComponent];
const ngxModules = [CommonModule];
const matModules = [MatCardModule, MatIconModule, NgxGaugeModule];

@NgModule({
  declarations: [...appComponents],
  imports: [
    RouterModule.forChild([{ path: '', component: AppDashboardComponent }]),
    ...ngxModules,
    ...matModules,
  ],
  exports: [...appComponents],
})
export class AppDashboardModule {}
