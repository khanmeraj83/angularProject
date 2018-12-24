import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from '../../app/services/auth.service';

@Injectable()

export class AuthGuard implements CanActivate {

    redirectUrl;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(
        router: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

        if (!this.authService.loggedIn()) {
            return true;
        } else {
            this.redirectUrl = state.url;
            this.router.navigate(['/login']);
            return false;
        }
        //   console.log('AuthGuard#canActivate called');
        //   return true;
    }
}