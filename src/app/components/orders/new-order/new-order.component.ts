import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { OrdersService } from '../../../services/orders.service';
import { CustomerService } from '../../../services/customer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  public products: any[] = [];
  public customers: any[] = [];
  public orderProducts: any[] = [];
  public selectedProduct: any = null;
  public selectedCustomer: any = null;
  public quantity: number = 1;
  public productMaxQuantity: number = 0;
  public totalPrice: number = 0;
  public totalDiscount: number = 0;
  public finalPrice: number = 0;
  public movementType: string = '';
  public token: string = '';
  public customerDiscountApplied: boolean = false;
  public showError: boolean = false;

  constructor(
    private productService: ProductService,
    private ordersService: OrdersService,
    private customerService: CustomerService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = this.authService.getAuthToken();
    this.getProductsAndCustomers();
  }

  public getProductsAndCustomers() {
    this.productService.getProducts(this.token).subscribe((products) => {
      this.products = products;
    });
    this.customerService.getCustomers(this.token).subscribe((customers) => {
      this.customers = customers;
    });
  }

  public addProduct() {
    if (this.selectedProduct && this.quantity > 0) {
      const product = this.selectedProduct;

      if (this.movementType === '2' && this.quantity > product.stockQuantity) {
        this.displayStockError();
        return;
      }

      const existingProduct = this.orderProducts.find(orderProduct => orderProduct.productId === product.id);

      if (existingProduct) {
        existingProduct.quantity += this.quantity;

        if (this.movementType === '2' && existingProduct.quantity > product.stockQuantity) {
          this.displayStockError();
          existingProduct.quantity -= this.quantity;
          return;
        }

        const totalProductPrice = existingProduct.unitPrice * existingProduct.quantity;
        const productDiscount = (product.productDiscount / 100) * totalProductPrice;
        existingProduct.totalPrice = totalProductPrice - productDiscount;

      } else {
        const totalProductPrice = product.price * this.quantity;
        const productDiscount = (product.productDiscount / 100) * totalProductPrice;
        const finalProductPrice = totalProductPrice - productDiscount;

        const newOrderProduct = {
          productId: product.id,
          productName: product.name,
          unitPrice: product.price,
          quantity: this.quantity,
          totalPrice: finalProductPrice,
          discount: productDiscount,
          stockQuantity: product.stockQuantity
        };

        this.orderProducts.push(newOrderProduct);
      }

      this.calculateTotals();
    }
  }


  public calculateTotals() {
    this.totalPrice = this.orderProducts.reduce((sum, item) => sum + item.totalPrice, 0);

    if (this.customerDiscountApplied && this.selectedCustomer && this.selectedCustomer.discountPercentage) {
      this.totalDiscount = (this.selectedCustomer.discountPercentage / 100) * this.totalPrice;
    } else {
      this.totalDiscount = 0;
    }

    this.finalPrice = this.totalPrice - this.totalDiscount;
  }

  public applyCustomerDiscount() {
    if (this.selectedCustomer && this.selectedCustomer.discountPercentage > 0) {
      this.customerDiscountApplied = true;
      this.calculateTotals();
    }
  }

  public onMovementTypeChange() {
    this.orderProducts = [];
    this.selectedProduct = null;
    this.calculateTotals();
  }

  public submitOrder() {
    if (this.orderProducts.length && this.selectedCustomer && this.movementType) {
      const movementTypeEnum = this.movementType === '1' ? 'PURCHASE' : 'SALE';

      const orderData = {
        customerId: this.selectedCustomer.id,
        movementType: movementTypeEnum,
        items: this.orderProducts.map((orderProduct) => ({
          product: orderProduct.productId,
          amount: orderProduct.quantity
        })),
        movementDiscount: 0
      };

      this.ordersService.createOrder(orderData, this.token).subscribe(() => {
        this.updateProductStock();
        this.router.navigate(['/orders']);

      });

      if (this.customerDiscountApplied) {
        this.customerService.updateCustomerDiscount(this.selectedCustomer.id, 0, this.token).subscribe(() => {
          this.selectedCustomer.discountPercentage = 0;
        });
      }
    }
  }

  public updateProductStock() {
    this.orderProducts.forEach((orderProduct) => {
      let newStockQuantity: number;
      if (this.movementType === '1') {
        newStockQuantity = orderProduct.stockQuantity + orderProduct.quantity;
      } else {
        newStockQuantity = orderProduct.stockQuantity - orderProduct.quantity;
      }

      this.productService.updateProductStock(orderProduct.productId, newStockQuantity, this.token).subscribe(() => {
      });
    });

    this.resetOrder();
  }

  public resetOrder() {
    this.orderProducts = [];
    this.selectedProduct = null;
    this.quantity = 1;
    this.totalPrice = 0;
    this.totalDiscount = 0;
    this.finalPrice = 0;
    this.customerDiscountApplied = false;
    this.movementType = '';
  }

  public onCustomerChange() {
    this.customerDiscountApplied = false;
    this.calculateTotals();
  }

  private displayStockError() {
    this.showError = true;
    setInterval(() => {
      this.showError = false;
    }, 3000)
  }
}
