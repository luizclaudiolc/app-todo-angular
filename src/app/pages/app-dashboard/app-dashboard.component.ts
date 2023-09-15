import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IPieData } from '../shared/charts/pie-chart/pie-chart.component';
import { ITask } from '../shared/interfaces/task.interface';
import { TasksService } from '../shared/services/tasks.service';

@Component({
  selector: 'app-app-dashboard',
  templateUrl: './app-dashboard.component.html',
  styleUrls: ['./app-dashboard.component.scss'],
})
export class AppDashboardComponent implements OnInit {
  taskDone: number = 0;
  taskNotDone: number = 0;
  allTasks: number = 0;
  dataConcluidas: IPieData[] = [];
  dataAFazer: IPieData[] = [];
  dataAll: IPieData[] = [];

  constructor(
    private taskService: TasksService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        [this.taskDone, this.taskNotDone, this.allTasks] = [
          tasks.filter(({ done }) => done === true).length,
          tasks.filter(({ done }) => done === false).length,
          tasks.length,
        ];

        this.dataConcluidas = this.parseData(
          tasks,
          'Concluídas',
          'Concluídas',
          'A Fazer',
          true,
          '#2d884d'
        );
        this.dataAFazer = this.parseData(
          tasks,
          'A fazer',
          'A fazer',
          'Concluídas',
          false,
          '#b34045'
        );
        this.dataAll = this.parseData(
          tasks,
          'Concluidas',
          'Concluidas',
          '',
          'all',
          '#4091d7'
        );

        this.cdr.detectChanges();
      },
    });
  }

  getLengthTask(tasks: ITask[], value: boolean | 'all'): number {
    return value === 'all'
      ? tasks.length
      : tasks.filter(({ done }) => done === value).length;
  }

  parseData(
    tasks: ITask[],
    title: string,
    selectName: string,
    restName: string | '',
    tasksLength: boolean | 'all',
    color: string
  ): IPieData[] {
    return [
      {
        title,
        selectName,
        Selectdvalue: this.getLengthTask(tasks, tasksLength),
        restName: restName,
        total: this.getLengthTask(tasks, 'all'),
        color,
        description:
          tasksLength === 'all'
            ? `Todas as tarefas: ${this.getLengthTask(tasks, 'all')}`
            : '',
      },
    ];
  }
}
