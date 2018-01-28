import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../base.component';

import { MENU_ITEMS } from './pages-menu';

import { ToDoService } from '../services/todo';

@Component({
  selector: 'ngx-pages',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
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
        this.dataShare.listToDoMap = {};
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
    this.dataShare.listToDoMap[listToDoItem.id] = this.menu[this.menu.length - 1];
  }
}
