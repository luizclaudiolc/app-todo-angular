import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import * as d3 from 'd3';

export interface IPieData {
  selectName: string;
  Selectdvalue: number;
  restName: string;
  total: number;
  color: string;
  title: string;
}

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, OnChanges {
  percentage: string = '';
  @Input('app-data') data: IPieData[] = [];

  single: any[] = [];
  colorScheme!: Color;
  arcWidth = 0.1;

  constructor() {
    // Object.assign(this, { this: this.single });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      const { selectName, total, Selectdvalue, color, title, restName } =
        this.data[0];
      this.percentage = this.transformPercentual(
        Math.round((Selectdvalue / total) * 100)
      );

      this.single = [
        {
          name: `${selectName}`,
          value: `${Selectdvalue}`,
        },
        {
          name: `${restName}`,
          value: `${total - Selectdvalue}`,
        },
      ];

      this.colorScheme = {
        name: 'myScheme',
        selectable: true,
        group: ScaleType.Ordinal,
        domain: [color, 'transparent'],
      };
    }
  }

  mouseLeave($event: MouseEvent) {
    console.log($event);
    this.arcWidth = 0.1;
  }

  mouseEnter($event: MouseEvent) {
    console.log($event);
    this.arcWidth = 0.15;
  }

  transformPercentual(value: number): string {
    let formattedNumber = (+value).toFixed(1);
    if (formattedNumber === '0.0') formattedNumber = '0.0';
    return formattedNumber.replace('.', ',');
  }
}
