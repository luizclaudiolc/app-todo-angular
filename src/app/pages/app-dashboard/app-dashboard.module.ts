import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NgxGaugeModule } from 'ngx-gauge';
import { AppDashboardComponent } from './app-dashboard.component';
import { PieChartModule } from '../shared/charts/pie-chart/pie-chart.module';

const appComponents = [AppDashboardComponent];
const ngxModules = [CommonModule];
const matModules = [MatCardModule, MatIconModule, NgxGaugeModule];
const appModules = [PieChartModule];

@NgModule({
  declarations: [...appComponents],
  imports: [
    RouterModule.forChild([{ path: '', component: AppDashboardComponent }]),
    ...ngxModules,
    ...matModules,
    ...appModules,
  ],
  exports: [...appComponents],
})
export class AppDashboardModule {}
