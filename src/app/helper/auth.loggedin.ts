import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AppConstant } from '../app.constant';

@Injectable()
export class AuthLoggedIn implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem(AppConstant.ACCESS_TOKEN)) {
            this.router.navigate(['/dashboard']);
            return false;
        }

        return true;
    }
}
