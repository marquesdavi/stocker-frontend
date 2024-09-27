import { Component, OnInit } from '@angular/core';
import { productService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/users.service';

@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.css'
})
export class NewOrderComponent implements OnInit {
  constructor(
    private productService: productService,
    private userService: UserService
  ) { }

  public products: any[] = [];
  public clientes: any[] = [];
  public orderProducts: any[] = [];
  public selectedProduct: any = null;
  public selectedClient: any = null;
  public quantity: number = 1;
  public discount: number = 0;
  public isDescounted: boolean = false;
  public totalPrice: number = 0;
  public totalDiscount: number = 0;
  public finalPrice: number = 0;
  public randomDiscountAdded: number = 0;

  ngOnInit(): void {
    this.getProductsAndClients();
  }

  public getProductsAndClients() {
    this.products = this.productService.getProducts();
    // this.clientes = this.userService.getUsers();
  }

  public addProduct() {
    if (this.selectedProduct && this.quantity > 0) {
      const product = this.selectedProduct;

      const precoUnitario = product.preco;
      const totalProductPrice = precoUnitario * this.quantity;

      const totalProductDiscount = (product.desconto / 100) * totalProductPrice;

      const precoFinal = totalProductPrice - totalProductDiscount;

      const newOrderProduct = {
        nomeProduto: product.nomeProduto,
        precoUnitario: precoUnitario,
        quantidade: this.quantity,
        precoTotal: precoFinal,
        desconto: totalProductDiscount
      };

      this.orderProducts.push(newOrderProduct);

      this.totalPrice += totalProductPrice;
      this.totalDiscount += totalProductDiscount;
      this.finalPrice = this.totalPrice - this.totalDiscount;

      this.selectedProduct = null;
      this.selectedClient = null;
      this.quantity = 1;
    }
  }

  public applyRandomDiscount() {
    this.isDescounted = true;
    const randomDiscountPercent = Math.floor(Math.random() * 51);

    const randomDiscountValue = (randomDiscountPercent / 100) * this.totalPrice;

    this.randomDiscountAdded = randomDiscountValue;
    this.totalDiscount = this.totalDiscount + this.randomDiscountAdded;
    this.finalPrice = this.totalPrice - this.totalDiscount;
  }
}
