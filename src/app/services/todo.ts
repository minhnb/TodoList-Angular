import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MHttp } from './mHttp';

import { AppConfig } from '../app.config';
import { AppConstant } from '../app.constant';

@Injectable()
export class ToDoService {
	private toDoListUrl = AppConfig.API_URL + 'todo_lists';
	private toDoChildUrl: string = 'todos';

	constructor(private mHttp: MHttp) { }

	createList(name: string): Observable<any> {
		let toDoList = {
			name: name
		};
		return this.mHttp.post(this.toDoListUrl, toDoList);
	}

	getList(): Observable<any> {
		return this.mHttp.get(this.toDoListUrl);
	}

	editList(id: string): Observable<any> {
		let toDoList = {
			name: name
		};
		return this.mHttp.put(this.toDoListUrl + '/' + id, toDoList);
	}

	deleteList(id: string): Observable<any> {
		return this.mHttp.delete(this.toDoListUrl + '/' + id, {});
	}

	getAllToDosByListId(listId: string): Observable<any> {
		return this.mHttp.get(this.toDoListUrl + '/' + listId + '/' + this.toDoChildUrl);
	}

	addAToDoToList(listId: string, name: string, done: boolean = false): Observable<any> {
		let toDo = {
			name: name,
			done: done
		};
		return this.mHttp.post(this.toDoListUrl + '/' + listId + '/' + this.toDoChildUrl, toDo);
	}

	updateAToDoInList(listId: string, id: string, name: string, done: boolean = false): Observable<any> {
		let toDo = {
			name: name,
			done: done
		};
		return this.mHttp.put(this.toDoListUrl + '/' + listId + '/' + this.toDoChildUrl + '/' + id, toDo);
	}

	deleteAToDoInList(listId: string, id: string): Observable<any> {
		return this.mHttp.delete(this.toDoListUrl + '/' + listId + '/' + this.toDoChildUrl + '/' + id, {});
	}
}
