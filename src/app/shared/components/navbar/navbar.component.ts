import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserService } from '../../../services/users.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAdmin: boolean = false;
  user: any;
  token: string = '';

  constructor(private authService: AuthenticationService, private userService: UserService) { }

  ngOnInit(): void {
    this.authService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
    this.token = this.authService.getAuthToken();
    
    this.userService.getCurrentUser(this.token).subscribe(
      user => {
        this.user = user
      }
    )
  }

  public logout() {
    this.authService.logout();
  }
}
