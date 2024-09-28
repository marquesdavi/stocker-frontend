import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  isAdmin: boolean = false;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
  }

  public logout() {
    this.authService.logout();
  }

}
