import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    hide = true;

    public username = new FormControl('', [Validators.required]);
    public password = new FormControl('', [Validators.required]);

    private redirectToUrl: string;

    constructor(
        private service: AuthenticationService,
        private toastr: ToastrService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.redirectToUrl = this.route.snapshot.queryParamMap.get('redirect_to') || '/';
    }

    sendLoginRequest() {
        this.service.loginUser(this.username.value, this.password.value).subscribe(
            response => {
                this.toastr.success('Sikeres bejelentkezés.', 'Wooah!');
                this.toastr.info(
                     response.expires + ' percen belül',
                    'Token lejár'
                );

                // noinspection JSIgnoredPromiseFromCall
                this.router.navigateByUrl(this.redirectToUrl);
            },
            err => {
                if (err.statusCode === 'OK') {
                    return;
                }

                if (err.error && err.error.error !== undefined) {
                    this.toastr.warning(err.error.error, 'Sikertelen bejelentkezés');
                }
            }
        );
    }
}
