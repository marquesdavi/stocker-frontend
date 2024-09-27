import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'stocker-frontend';
  public showNavbar: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
this.router.events.subscribe((event) => {
  if (event instanceof NavigationEnd) {
    this.showNavbar = !(event.url === '/login' || event.url === '/');
  }
});

  }
}
