import { Component, OnInit } from '@angular/core';
import { productService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  public products: any[] = []

  constructor(
    private productService: productService
  ){}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  addProduct(form: NgForm) {
    const newProduct = {
      nomeProduto: form.value.nomeProduto,
      quantidade: 0,
      preco: `${form.value.precoProduto}`,
      categoria: form.value.categoriaProduto,
      descricao: form.value.descricaoProduto,
      dataValidade: form.value.dataValidadeProduto,
      desconto:`${form.value.descontoProduto}`
    };

    this.products.push(newProduct);
    form.resetForm();
  }
}
