import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthenticationService, private cookieService: CookieService) {}

  public login() {
    if(this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          this.cookieService.set('accessToken', response.accessToken, { expires: 1, path: '/' });
          this.router.navigate(['products']);
        },
        error: (error) => {
          this.errorMessage = 'Email ou senha inválidos';
          console.error(error);
        },
      });
    } else {
      this.errorMessage = 'Preencha os campos de email e senha';
    }
  }
}
