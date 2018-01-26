import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AppConstant } from '../app.constant';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem(AppConstant.ACCESS_TOKEN)) {
            return true;
        }
        this.router.navigate(['/auth/login']);
        return false;
    }
}
