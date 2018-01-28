import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstant } from './app.constant';
import { AppConfig } from './app.config';
import { DataShare } from './helper/data.share';
import { MAlert } from './helper/mAlert';

@Component({

})
export class BaseComponent {

	public router: Router;
	public alert: MAlert;
	public dataShare: DataShare;

	constructor(injector: Injector) {
		this.router = injector.get(Router);
		this.alert = injector.get(MAlert);
		this.dataShare = injector.get(DataShare);
	}

	sortListById(list: Array<any>) {
		list.sort((a, b) => {
      return a.id - b.id;
    });
	}
}
