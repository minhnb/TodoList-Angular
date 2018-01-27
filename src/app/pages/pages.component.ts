import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

import { ToDoService } from '../services/todo';

@Component({
  selector: 'ngx-pages',
  templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss'],
  providers: [ToDoService]
})
export class PagesComponent {

  menu: Array<any> = [];

  constructor(private toDoService: ToDoService) {
    this.initMenu();
    this.loadListToDo();
  }

  initMenu() {
    MENU_ITEMS.forEach(item => {
      this.menu.push(item);
    });
  }

  loadListToDo() {
    this.toDoService.getList().subscribe(
      res => {
        res.forEach(item => {
          this.addAToDoListToMenu(item);
        });
      },
      err => {

      }
    )
  }

  addAToDoListToMenu(listToDoItem: any) {
    let menuItem = {
      title: listToDoItem.name,
      icon: 'nb-list',
      link: '/todo/' + listToDoItem.id
    };
    this.menu.push(menuItem);
  }
}
