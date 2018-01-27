import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MHttp } from './mHttp';

import { AppConfig } from '../app.config';
import { AppConstant } from '../app.constant';

@Injectable()
export class ToDoService {
	private todoListUrl = AppConfig.API_URL + 'todo_lists';

	constructor(private mHttp: MHttp) { }

	createList(name: string): Observable<any> {
		let todoList = {
			name: name
		};
		return this.mHttp.post(this.todoListUrl, todoList);
	}

	getList(): Observable<any> {
		return this.mHttp.get(this.todoListUrl);
	}

	editList(id: string): Observable<any> {
		let todoList = {
			name: name
		};
		return this.mHttp.put(this.todoListUrl + '/' + id, todoList);
	}

	deleteList(id: string): Observable<any> {
		return this.mHttp.delete(this.todoListUrl + '/' + id, {});
	}
}
