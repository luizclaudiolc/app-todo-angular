import { Component, OnInit } from '@angular/core';
import { ITask } from '../shared/interfaces/task.interface';
import { TasksService } from '../shared/services/tasks.service';
import * as c3 from 'c3';
import * as d3 from 'd3';

@Component({
  selector: 'app-app-dashboard',
  templateUrl: './app-dashboard.component.html',
  styleUrls: ['./app-dashboard.component.scss'],
})
export class AppDashboardComponent implements OnInit {
  taskDone: number = 0;
  taskNotDone: number = 0;
  allTasks: number = 0;

  gaugeType: string = 'semi';
  gaugeValue = 21;
  gaugeLabel = 'Speed';
  gaugeAppendText = '%';
  size: number = 280;

  thresholdConfig = {
    '0': {
      color: 'green',
      bgOpacity: 1,
    },
    '40': {
      color: 'orange',
      bgOpacity: 1,
    },
    '75.5': {
      color: 'red',
      bgOpacity: 1,
    },
  };

  marker = {
    '0': {
      color: '#555',
      type: 'line',
      size: 8,
      label: '0%',
      font: '12px Roboto',
    },
    '40': {
      color: '#555',
      type: 'line',
      size: 8,
      label: '40%',
      font: '12px arial',
    },
    '75.5': {
      color: '#555',
      type: 'line',
      size: 8,
      label: '75.5%',
      font: '12px arial',
    },
    '100': {
      color: '#555',
      type: 'line',
      size: 8,
      label: '100%',
      font: '12px arial',
    },
  };

  constructor(private taskService: TasksService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        [this.taskDone, this.taskNotDone, this.allTasks] = [
          tasks.filter(({ done }) => done === true).length,
          tasks.filter(({ done }) => done === false).length,
          tasks.length,
        ];

        this.drawChart(tasks);
      },
    });
  }

  drawChart(tasks: ITask[]) {
    const chart = c3.generate({
      bindto: '#gauge-char',
      data: {
        columns: [['Concluidas', this.taskDone]],
        type: 'gauge',
        colors: {
          Concluidas: '#f0f',
        },
        onclick: (d, i) => console.log({ onClick: { d, i } }),
        onmouseover: (d, el) => {
          const target = el?.getAttribute('class');
          console.log(target);

          d3.selectAll(`.${target}`).attr('opacity', 0.3);
          // d3.select(el);
        },
        onmouseout: (d, i) => console.log('onmouseout', { d, i }),
        empty: {
          label: { text: 'Nada de Dados' },
        },
        names: {
          test: 'test',
        },
      },
      transition: {
        duration: 3000,
      },
      gauge: {
        label: {
          format: (value, ratio) =>
            Math.floor((value / this.allTasks) * 100).toFixed(1),
          show: true, // to turn off the min/max labels.
        },
        min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        max: this.allTasks || 100, // 100 is default
        units: '%',
        width: 15, // for adjusting arc thickness
      },
      color: {
        pattern: ['#60B044'],
        threshold: {
          // unit: 'value', // percentage is default
          // max: 200, // 100 is default
          values: ['#f00'],
        },
      },
      size: {
        height: 180,
      },
    });
  }
}
