import { Component, Injector } from '@angular/core';
import { AppConstant } from './app.constant';
import { AppConfig } from './app.config';
import { DataShare } from './helper/data.share';
import { MAlert } from './helper/mAlert';

@Component({

})
export class BaseComponent {

	public alert: MAlert;
	public dataShare: DataShare;

	constructor(injector: Injector) {
		this.alert = injector.get(MAlert);
		this.dataShare = injector.get(DataShare);
	}
}
