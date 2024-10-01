import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { OrdersService } from '../../services/orders.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  public orders: any[] = [];
  public token: string = '';

  constructor(
    private router: Router,
    private ordersService: OrdersService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.token = this.authService.getAuthToken();
    this.getOrders();
  }

  public popAlert(): any {
    this.router.navigate(['/new-order']);
  }

  public getOrders() {
    this.ordersService.getOrders(this.token).subscribe((data) => {
      this.orders = data;
    });
  }
}
