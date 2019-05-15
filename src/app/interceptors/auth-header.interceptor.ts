import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {catchError} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

    private user;

    constructor(
        private authenticationService: AuthenticationService,
        private  toastr: ToastrService,
        private  router: Router) {
        authenticationService.observableUser.subscribe(u => this.user = u);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.user && this.user.token) {
            req = req.clone({
                setHeaders: {
                    'Content-Type': 'application/json; charset=utf-8',
                    Accept: 'application/json',
                    Authorization: this.user.token,
                },
            });
        }

        return next.handle(req).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        this.toastr.error('Login required', '401');
                        this.authenticationService.logout();
                        // noinspection JSIgnoredPromiseFromCall
                        this.router.navigateByUrl('/login');
                    }
                }
                return new Observable<HttpEvent<any>>();
            })
        );
    }
}
