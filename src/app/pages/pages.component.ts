import { Component, Injector } from '@angular/core';
import { BaseComponent } from '../base.component';

import { MENU_ITEMS } from './pages-menu';

import { ToDoService } from '../services/todo';

@Component({
  selector: 'ngx-pages',
  templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss'],
  providers: [ToDoService]
})
export class PagesComponent extends BaseComponent {

  menu: Array<any> = [];

  constructor(private injector: Injector, private toDoService: ToDoService) {
    super(injector);
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
        this.alert.showError(err.message);
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
