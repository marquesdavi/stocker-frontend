import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Location } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthenticationService, private location: Location) { }

    canActivate(): boolean {
        if (this.authService.isAdmin()) {
            return true;
        } else {
            this.location.back();
            return false;
        }
    }
}
