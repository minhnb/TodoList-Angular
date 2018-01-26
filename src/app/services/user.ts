import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MHttp } from './mHttp';

import { AppConfig } from '../app.config';
import { AppConstant } from '../app.constant';

@Injectable()
export class UserService {
	private userUrl = AppConfig.API_URL + 'auth';
	errorWrongUserNameOrPassword: any;

	constructor(private mHttp: MHttp) { }

	clearLocalStorage() {
		localStorage.clear();
	}

	saveUserAccessTokenToLocalStorage(data: any) {
		localStorage.setItem(AppConstant.ACCESS_TOKEN, data[AppConstant.ACCESS_TOKEN]);
		localStorage.setItem(AppConstant.CLIENT, data[AppConstant.CLIENT]);
		localStorage.setItem(AppConstant.UID, data[AppConstant.UID]);
	}

	handleLogout(data: any): any {
		this.clearLocalStorage();
		return data;
	}

	signIn(email: string, password: string): Observable<any> {
		let user = {
			email: email,
			password: password
		};
		return this.mHttp.post(this.userUrl + '/sign_in', user, null, false);
	}

	signUp(user: Object): Observable<any> {
        return this.mHttp.post(this.userUrl, user);
	}

  signOut(): Observable<any> {
    return this.mHttp.post(this.userUrl + '/sign_out', {});
  }
}
