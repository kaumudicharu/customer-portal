import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private router: Router) { }

    canActivate(): boolean {
        let token = localStorage.getItem("access_token");
        if (token) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}