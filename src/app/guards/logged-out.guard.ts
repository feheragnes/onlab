import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {ToastrService} from 'ngx-toastr';


@Injectable({providedIn: 'root'})
export class LoggedOutGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private toastr: ToastrService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authenticationService.isTokenValid()) {
            return true;
        }

        // redirect to login page
        this.toastr.warning('This page is not available for logged in users!', 'You are already logged in!');
        this.router.navigateByUrl('/');
        return false;
    }
}
