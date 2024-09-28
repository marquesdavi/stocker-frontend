import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  user: any;
  token: string = '';
  constructor(
    private userService: UserService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.token = this.authService.getAuthToken();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.userService.getCurrentUser(this.token).subscribe((user) => {
      this.user = user;
    });
  }
}
