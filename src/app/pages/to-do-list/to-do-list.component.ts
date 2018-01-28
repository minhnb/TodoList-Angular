import { Component, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../base.component';
import { ToDoService } from '../../services/todo';

@Component({
  selector: 'to-do-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent extends BaseComponent implements OnInit {

  listId: string;
  listName: string;
  toDos: Array<any> = [];
  toDosBackup: any = {};
  private sub: any;

  constructor(private injector: Injector, private route: ActivatedRoute, private toDoService: ToDoService) {
    super(injector);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
			this.listId = params['listId'];
      this.getAllToDosOfCurrentList();
		});
  }

  getListName() {
    if (!this.dataShare.listToDoMap[this.listId]) {
      return '';
    }
    return this.dataShare.listToDoMap[this.listId].title;
  }

  updateBackup(item: any) {
    this.toDosBackup[item.id] = Object.assign({}, item);
  }

  createToDoBackup() {
    this.toDos.forEach(item => {
      this.updateBackup(item);
    });
  }

  getAllToDosOfCurrentList() {
    this.toDoService.getAllToDosByListId(this.listId).subscribe(
      res => {
        this.toDos = res;
        this.sortListById(this.toDos);
        this.createToDoBackup();
        this.listName = this.getListName();
      },
      err => {
        this.alert.showError(err.message);
      }
    )
  }

  createAToDo() {
    this.toDoService.addAToDoToList(this.listId, '').subscribe(
      res => {
        this.toDos.push(res);
        this.updateBackup(res);
      },
      err => {
        this.alert.showError(err);
      }
    );
  }

  updateAToDo(toDo: any) {
    let oldToDo = this.toDosBackup[toDo.id];
    if (!this.isNeedUpdatedItem(oldToDo, toDo)) {
      return;
    }
    this.toDoService.updateAToDoInList(this.listId, toDo.id, toDo.name, toDo.done).subscribe(
      res => {
        this.updateBackup(res);
      },
      err => {
        this.alert.showError(err.message);
      }
    );
  }

  deleteAtoDo(id: string, index: number) {
    this.alert.showConfirm('Are you sure you want to delete this item?', () => {
      this.toDoService.deleteAToDoInList(this.listId, id).subscribe(
        res => {
          this.toDos.splice(index, 1);
        },
        err => {
          this.alert.showError(err);
        }
      );
    });
  }

  toggleToDoResult(item) {
    item.done = !item.done;
    this.updateAToDo(item);
  }

  isNeedUpdatedItem(oldItem: any, newItem: any) {
    if (oldItem.id != newItem.id) {
      return false;
    }
    if (oldItem.name != newItem.name) {
      return true;
    }
    if (oldItem.done != newItem.done) {
      return true;
    }
    return false;
  }

  updateListName() {
    if (this.listName != this.dataShare.listToDoMap[this.listId].title) {
      this.toDoService.editList(this.listId, this.listName).subscribe(
        res => {
          this.dataShare.listToDoMap[this.listId].title = res.name;
          this.listName = this.getListName();
        },
        err => {
          this.alert.showError(err);
        }
      )
    }
  }
}
