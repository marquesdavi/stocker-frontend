import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { OrdersService } from '../services/orders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
  public orders: any[]=[];

  constructor(
    private router: Router,
    private ordersService: OrdersService
  ) {} 

  ngOnInit(): void {
    this.getOrders();
  }

  public popAlert(): any {
    this.router.navigate(['/new-order'])
  }

  public getOrders() {
    this.orders = this.ordersService.getOrders();
  }
}
