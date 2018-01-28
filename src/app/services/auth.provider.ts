import { Injectable } from '@angular/core';
import {
  NbAbstractAuthProvider,
  NbAuthResult,
  NbAuthSimpleToken
} from '@nebular/auth';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { UserService } from './user';

export interface UserData {
  email: string;
  password: string;
  fullName: string;
}

@Injectable()
export class AuthProvider extends NbAbstractAuthProvider {

  constructor(private userService: UserService) {
    super();
  }

  authenticate(user: UserData): Observable<NbAuthResult> {
    return this.userService.signIn(user.email, user.password)
    .map((res: any) => {
      this.userService.saveUserAccessTokenToLocalStorage(res.userAuth);
      return new NbAuthResult(true, res, '/dashboard', false, `Sign in successful!`, null);
    })
    .catch((res) => {
      let errors = [res.message];

      return Observable.of(new NbAuthResult(false, res, null, errors));
    });
  }

  register(data: UserData): Observable<NbAuthResult> {
    let userData: any = data;
    return this.userService.signUp(userData)
    .map((res: any) => {
      return new NbAuthResult(true, res, '/auth/login', false, `Sign up successful!`, null);
    })
    .catch((res) => {
      let errors = [res.message];

      return Observable.of(new NbAuthResult(false, res, null, errors));
    });
  }
  requestPassword(data?: UserData): Observable<NbAuthResult> {
    throw new Error('Method not implemented.');
  }
  resetPassword(data?: UserData): Observable<NbAuthResult> {
    throw new Error('Method not implemented.');
  }

  logout(): Observable<NbAuthResult> {
    return this.userService.signOut()
    .map((res: any) => {
      this.userService.handleLogout(res);
      return new NbAuthResult(true, {}, '/auth/login', false, 'Sign out success.');
    })
    .catch((res) => {
      this.userService.handleLogout(res);
      let errors = [res.message];
      return Observable.of(new NbAuthResult(false, res, '/auth/login', errors));
    });
  }

}
