import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  constructor(
    private router: Router
  ) {}
  public popAlert(): any {
    this.router.navigate(['/new-order'])
  }
}
