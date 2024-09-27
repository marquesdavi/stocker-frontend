import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router: Router, private cookieService: CookieService, private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/auth/login`, {email, password});
  }

  isLoggedIn(): boolean {
    return !!this.cookieService.get('accessToken');
  }

  logout() {
    this.cookieService.delete('accessToken', '/');
    this.router.navigate(['/login']);
  }
}
