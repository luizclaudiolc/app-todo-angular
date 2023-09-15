import { Component, OnInit } from '@angular/core';

export interface ItemsMenu {
  label: string;
  icon?: string;
  link?: string;
}

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent implements OnInit {
  itemsMenuBars: ItemsMenu[] = [];

  ngOnInit(): void {
    this.itemsMenuBars = [
      {
        label: 'Tarefas',
        icon: 'task',
        link: '/tasks',
      },
      {
        label: 'Dashboard',
        icon: 'dashboard',
        link: '/dashboard',
      },
    ];
  }
}
