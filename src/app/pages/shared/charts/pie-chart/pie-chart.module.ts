import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from './pie-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const NgxModules = [CommonModule];
const appComponent = [PieChartComponent];

@NgModule({
  declarations: [...appComponent],
  imports: [...NgxModules, NgxChartsModule],
  exports: [...appComponent],
})
export class PieChartModule {}
