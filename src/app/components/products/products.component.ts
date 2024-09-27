import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { productService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnChanges {
  public products: any[] = []
  public count = 0;
  public editMode: boolean = false;
  public selectedProduct: any = null;

  constructor(
    private productService: productService
  ){}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.searchProduct(changes);
  }

  addProduct(form: NgForm) {
    this.count = this.products.length;
    //remover a lógica do newId
    const newId = this.count + 1;
    const newProduct = {
      id: newId,
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

  searchProduct($event: any) {
    const search = $event.target.value;
    this.products = this.productService.getProducts().filter((product: any) => {
      return product.nomeProduto.toLowerCase().includes(search.toLowerCase());
    });

    if(!search) {
      this.products = this.productService.getProducts();
    }
  }


  editProduct(product: any) {
    product.isEditing = true;
  }

  saveProduct(product: any) {
    product.isEditing = false;
  }

  cancelEditProduct(product: any) {
    product.isEditing = false;
  }

  removeProduct(id: number) {
    this.products = this.products.filter(product => product.id !== id);
  }	
}
