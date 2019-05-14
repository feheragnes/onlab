import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    hide = true;

    public username = new FormControl('', [Validators.required]);
    public password = new FormControl('', [Validators.required]);

    constructor(private service: UserService, private toastr: ToastrService) {
    }

    sendLoginRequest() {
        this.service.loginUser(this.username.value, this.password.value).subscribe(
            response => {
                this.toastr.success('Login successful.', 'Wooah!');
                this.toastr.info(response.token, 'Auth Token');
                this.toastr.info('in ' + response.expires + ' minutes', 'Token expires');
            },
            err => {
                if (err.statusCode === 'OK') {
                    return;
                }

                if (err.error && err.error.error !== undefined) {
                    this.toastr.warning(err.error.error, 'Login failed');
                }
            });
    }
}
