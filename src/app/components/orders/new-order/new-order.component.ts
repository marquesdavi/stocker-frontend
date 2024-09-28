import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { OrdersService } from '../../../services/orders.service';
import { UserService } from '../../../services/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.css'
})
export class NewOrderComponent implements OnInit {
  public products: any[] = [];
  public clientes: any[] = [];
  public orderProducts: any[] = [];
  public selectedProduct: any = null;
  public selectedClient: any = null;
  public quantity: number = 1;
  public discount: number = 0;
  public totalPrice: number = 0;
  public finalPrice: number = 0;
  public movementType: string = '';
  public token: string = '';

  constructor(
    private productService: ProductService,
    private ordersService: OrdersService,
    private authService: AuthenticationService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.token = this.authService.getAuthToken();
    this.getProductsAndClients();
  }

  public getProductsAndClients() {
    this.productService.getProducts(this.token).subscribe((products) => {
      this.products = products;
    });
    this.customerService.getCustomers(this.token).subscribe((clientes) => {
      this.clientes = clientes;
    });
  }

  public addProduct() {
    if (this.selectedProduct && this.quantity > 0) {
      const product = this.selectedProduct;
      const totalProductPrice = product.price * this.quantity;

      const newOrderProduct = {
        productId: product.id,
        nomeProduto: product.name,
        precoUnitario: product.price,
        quantidade: this.quantity,
        precoTotal: totalProductPrice
      };

      this.orderProducts.push(newOrderProduct);
      this.totalPrice += totalProductPrice;
      this.finalPrice = this.totalPrice;
    }
  }

  public submitOrder() {
    if (this.orderProducts.length && this.selectedClient && this.movementType) {
      const movementTypeEnum = this.movementType === '1' ? 'PURCHASE' : 'SALE';

      const orderData = {
        customerId: this.selectedClient.id,
        movementType: movementTypeEnum,
        items: this.orderProducts.map((orderProduct) => ({
          product: orderProduct.productId,
          amount: orderProduct.quantidade
        }))
      };

      this.ordersService.createOrder(orderData, this.token).subscribe(() => {
        this.updateProductStock();
      });
    }
  }

  public updateProductStock() {
    this.orderProducts.forEach((orderProduct) => {
      const newStock =
        this.movementType === '1'
          ? orderProduct.quantidade + this.selectedProduct.stockQuantity
          : this.selectedProduct.stockQuantity - orderProduct.quantidade;

      this.productService.updateProductStock(orderProduct.productId, newStock, this.token).subscribe(() => {

      });
    });
  }
}
