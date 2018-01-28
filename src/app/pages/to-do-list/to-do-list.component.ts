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
  private sub: any;

  constructor(private injector: Injector, private route: ActivatedRoute, private toDoService: ToDoService) {
    super(injector);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
			this.listId = params['listId'];
      this.listName = this.getListName();
      this.getAllToDosOfCurrentList();
		});
  }

  getListName() {
    if (!this.dataShare.listToDoMap[this.listId]) {
      return '';
    }
    return this.dataShare.listToDoMap[this.listId].title;
  }

  getAllToDosOfCurrentList() {
    this.toDoService.getAllToDosByListId(this.listId).subscribe(
      res => {
        this.toDos = res;
      },
      err => {
        this.alert.showError(err.message);
      }
    )
  }

  toggleToDoResult() {

  }

}
