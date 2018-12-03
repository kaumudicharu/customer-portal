import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})


export class LoginComponent {

    public username = "test.user";
    public password = "test@Password1";
    constructor(private http: Http,
        private _router: Router) {}

    public login(username: string, password: string): void {
        const headers: Headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',

        });
        const options: RequestOptions = new RequestOptions({ headers: headers });
        const body = `username=${username}&password=${password}`;

        this.http.post('https://test.feature.bluechain.com/v1/login/token', body, options)
            .subscribe((result) => {
                localStorage.setItem("access_token", JSON.parse(result["_body"]).access_token);
                console.log(result);
                this._router.navigate(['/customers']);
            });
    }
}
