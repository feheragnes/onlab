import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../interfaces/user';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ExcludeAuthInterceptorHelper} from './exclude-auth-interceptor-helper.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private userSubject;
    public readonly observableUser;
    private user;

    constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.observableUser = this.userSubject.asObservable();
        this.observableUser.subscribe(u => this.user = u);
        window.addEventListener('storage', e => {
            if (e.key === 'user') {
                this.getUserFromStorage();
            }
        });
    }

    private getUserFromStorage() {
        const isValidBefore = this.isTokenValid();
        this.userSubject.next(JSON.parse(localStorage.getItem('user')));
        const isValidAfter = this.isTokenValid();

        // logged out on another tab
        if (isValidBefore && !isValidAfter) {
            this.toastr.info('You logged out on another tab.', 'Logged out');
            // noinspection JSIgnoredPromiseFromCall
            this.router.navigateByUrl('/login');
        } else
        // logged in on another tab
        if (!isValidBefore && isValidAfter) {
            this.toastr.info('You logged in on another tab.', 'Logged in');
            // noinspection JSIgnoredPromiseFromCall
            this.router.navigateByUrl('/');
        }


    }

    isTokenValid(): boolean {
        return this.user && this.user.token && !this.isTokenExpired();
    }

    isTokenExpired(): boolean {
        const timeNow = (new Date()).getTime();
        return this.userSubject.expires ?
            timeNow < this.userSubject.expires :
            false;
    }

    loginUser(username: string, password: string): Observable<any> {

        const url = environment.api_URI + 'user/login';
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
        };
        const body = new URLSearchParams();
        body.set('username', username);
        body.set('password', password);

        ExcludeAuthInterceptorHelper.excludeAuthInterceptor = true;
        return this.http.post<User>(url, body.toString(), options).pipe(map(response => {

            if (response.token && response.expires) {
                const expiresInSeconds = Number.parseInt(response.expires, 0) * 60;
                const user: User = {...response};
                user.expires = user.expires + expiresInSeconds;
                this.userSubject.next(user);
                localStorage.setItem('user', JSON.stringify(user));
            }

            return response;
        }));
    }

    registerUser(body: URLSearchParams): Observable<any> {

        const url = environment.api_URI + 'user/registration';
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };

        ExcludeAuthInterceptorHelper.excludeAuthInterceptor = true;
        return this.http.put(url, body.toString(), options);
    }


    logout() {
        this.userSubject.next(null);
        localStorage.removeItem('user');
    }

}
