import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class productService {
    products = [
        {
            nomeProduto: "Arroz",
            quantidade: 10,
            preco: "20.00",
            categoria: "Alimentos",
            descricao: "Arroz integral",
            dataValidade: "2025-08-01",
            desconto: "10"
        },
        {
            nomeProduto: "Feijão",
            quantidade: 5,
            preco: "12.50",
            categoria: "Alimentos",
            descricao: "Feijão carioca",
            dataValidade: "2024-12-31",
            desconto: "5"
        },
        {
            nomeProduto: "Macarrão",
            quantidade: 20,
            preco: "15.00",
            categoria: "Alimentos",
            descricao: "Macarrão espaguete",
            dataValidade: "2025-10-15",
            desconto: "8"
        },
        {
            nomeProduto: "Azeite",
            quantidade: 3,
            preco: "25.00",
            categoria: "Condimentos",
            descricao: "Azeite extra virgem",
            dataValidade: "2026-06-20",
            desconto: "12"
        },
        {
            nomeProduto: "Leite",
            quantidade: 12,
            preco: "6.00",
            categoria: "Bebidas",
            descricao: "Leite integral",
            dataValidade: "2024-09-05",
            desconto: "7"
        },
        {
            nomeProduto: "Café",
            quantidade: 15,
            preco: "8.50",
            categoria: "Bebidas",
            descricao: "Café torrado e moído",
            dataValidade: "2024-11-10",
            desconto: "10"
        }
      ];

    constructor() {}

    public getProducts() {
        return this.products;
    }
    
}