import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { categories } from '../../utills/categories';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  public products: any[] = [];
  public editMode: boolean = false;
  public selectedProduct: any = null;
  public token: string = '';
  public categories: any[] = [];
  constructor(
    private productService: ProductService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.token = this.authService.getAuthToken();
    this.categories = categories;
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts(this.token).subscribe((products: any) => {
      this.products = products;
    });
  }

  addProduct(form: NgForm) {
    const newProduct = {
      name: form.value.nomeProduto,
      price: form.value.precoProduto,
      category: form.value.categoriaProduto,
      description: form.value.descricaoProduto,
      expirationDate: form.value.dataValidadeProduto,
      productDiscount: form.value.descontoProduto,
      stockQuantity: 0,
    };

    this.productService.addProduct(newProduct, this.token).subscribe(() => {
      this.loadProducts();
      form.resetForm();
    });
  }

  saveProduct(product: any) {
    this.productService.updateProduct(product.id, product, this.token).subscribe(() => {
      product.isEditing = false;
      this.loadProducts();
    });
  }

  removeProduct(id: string) {
    this.productService.deleteProduct(id, this.token).subscribe(() => {
      this.loadProducts();
    });
  }

  searchProduct($event: any) {
    const search = $event.target.value;
    if (!search) {
      this.loadProducts();
    } else {
      this.products = this.products.filter((product: any) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  }

  editProduct(product: any) {
    product.isEditing = true;
  }

  cancelEditProduct(product: any) {
    product.isEditing = false;
  }

  translateCategory(value: string): string {
    const category = this.categories.find(cat => cat.value === value);
    return category ? category.label : value;
  }
}
