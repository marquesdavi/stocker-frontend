import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { UserService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public token: string = '';

  constructor(private router: Router, private cookieService: CookieService, private http: HttpClient, private userService: UserService) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, { email, password });
  }

  isLoggedIn(): boolean {
    return !!this.cookieService.get('accessToken');
  }

  logout() {
    this.cookieService.delete('accessToken', '/');
    this.router.navigate(['/login']);
  }

  getAuthToken() {
    return this.cookieService.get('accessToken');
  }

  public isAdmin(): Observable<boolean> {
    this.token = this.getAuthToken();
    return this.userService.getCurrentUser(this.token).pipe(
      map(user => user.roles[0] === 'ADMIN')
    );
  }  
}
