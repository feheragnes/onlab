import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    loginUser(username: string, password: string): Observable<any> {
        const url = environment.api_URI + 'user/login';
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        const body = new URLSearchParams();
        body.set('username', username);
        body.set('password', password);

        return this.http.post(url, body.toString(), options);
    }

    registerUser(body: URLSearchParams): Observable<any> {
        const url = environment.api_URI + 'user/registration';
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };

        return this.http.put(url, body.toString(), options);
    }

}
