import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {ToastrService} from 'ngx-toastr';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private toastr: ToastrService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authenticationService.isTokenValid()) {
            return true;
        } else if (this.authenticationService.isTokenExpired()) {
            this.toastr.error('You have to login again.', 'Token expired');
        }

        // redirect to login page
        this.router.navigate(['/login'], {queryParams: {redirect_to: state.url}});
        return false;
    }
}
