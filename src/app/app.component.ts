import {Component} from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public title = 'NFL stats';
    public user = true;

    constructor(private authenticationService: AuthenticationService, private router: Router, private toastr: ToastrService) {
        authenticationService.observableUser.subscribe(u => this.user = u);
    }

    logout() {
        this.authenticationService.logout();
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigateByUrl('/');
        this.toastr.success('Redirecting to Login.', 'Logout successful!');
    }

}
