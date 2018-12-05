import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { EventEmitterService } from '../services/eventEmitterService';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})


export class LoginComponent {

    public username = "test.user";
    public password = "test@Password1";

    constructor(private http: Http,
        private _router: Router,
        private _eventEmitter: EventEmitterService) {}

    public login(username: string, password: string): void {
        const headers: Headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',

        });
        const options: RequestOptions = new RequestOptions({ headers: headers });
        const body = `username=${username}&password=${password}`;

        this.http.post('https://test.feature.bluechain.com/v1/login/token', body, options)
            .subscribe((result) => {
                localStorage.setItem("access_token", JSON.parse(result["_body"]).access_token);
                localStorage.setItem("loggedUser", username);
                this._eventEmitter.sendLoginEvent(true);
                console.log(result);
                this._router.navigate(['/customers']);
            });
    }
}
