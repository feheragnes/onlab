import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    constructor(private service: UserService, private toastr: ToastrService, private router: Router) {
    }

    hide = true;
    public username = new FormControl('', [Validators.required]);
    public email = new FormControl('', [Validators.required, Validators.email]);
    public password = new FormControl('', [Validators.required]);
    public passwordVerify = new FormControl('', [Validators.required]);
    public firstName = new FormControl('');
    public lastName = new FormControl('');

    ngOnInit() {
    }

    getErrorMessage() {
        return this.email.hasError('required')
            ? 'You must enter a value'
            : this.email.hasError('email')
                ? 'Not a valid email'
                : '';
    }

    private getBody(): URLSearchParams {
        const body = new URLSearchParams();
        body.set('username', this.username.value);
        body.set('password', this.password.value);
        body.set('passwordVerify', this.passwordVerify.value);
        body.set('email', this.email.value);
        body.set('firstName', this.firstName.value);
        body.set('lastName', this.lastName.value);

        return body;
    }

    sendRegisterRequest() {
        this.service.registerUser(this.getBody()).subscribe(
            () => {
                // noinspection JSIgnoredPromiseFromCall
                this.router.navigateByUrl('/login');
                this.toastr.success('Registration successful.', 'Wooah!');
            },
            err => {
                if (err.statusCode === 'OK') {
                    return;
                }

                if (err.error && err.error.error !== undefined) {
                    this.toastr.warning(err.error.error, 'Registration failed!');
                }
            });
    }
}
