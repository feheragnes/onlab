import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../interfaces/user';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private userSubject;
    public readonly observableUser;
    private user;

    constructor(private http: HttpClient) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.observableUser = this.userSubject.asObservable();
        this.observableUser.subscribe(u => this.user = u);
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
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        const body = new URLSearchParams();
        body.set('username', username);
        body.set('password', password);

        return this.http.post<User>(url, body.toString(), options).pipe(map(response => {
            if (response.token && response.expires) {
                const expiresInSeconds = Number.parseInt(response.expires, 0) * 60;
                const user: User = {...response};
                user.expires = user.expires + expiresInSeconds;
                this.userSubject.next(user);
                localStorage.setItem('user', JSON.stringify(response));
            }
            return response;
        }));
    }

    registerUser(body: URLSearchParams): Observable<any> {
        const url = environment.api_URI + 'user/registration';
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };

        return this.http.put(url, body.toString(), options);
    }


    logout() {
        this.userSubject.next(null);
        localStorage.removeItem('user');
    }

}
