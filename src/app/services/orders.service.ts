import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class OrdersService {
    orders = [
        {
            "dataMovimentacao": "2024-08-01",
            "quantidadeTotal": 100,
            "tipoMovimentacao": "Venda",
            "cliente": "João Silva",
            "desconto": "15%"
        },
        {
            "dataMovimentacao": "2024-08-05",
            "quantidadeTotal": 50,
            "tipoMovimentacao": "Compra",
            "cliente": "Maria Souza",
            "desconto": "10%"
        },
        {
            "dataMovimentacao": "2024-08-10",
            "quantidadeTotal": 200,
            "tipoMovimentacao": "Venda",
            "cliente": "Carlos Pereira",
            "desconto": "5%"
        },
        {
            "dataMovimentacao": "2024-08-15",
            "quantidadeTotal": 75,
            "tipoMovimentacao": "Compra",
            "cliente": "Fernanda Costa",
            "desconto": "8%"
        },
        {
            "dataMovimentacao": "2024-08-20",
            "quantidadeTotal": 150,
            "tipoMovimentacao": "Venda",
            "cliente": "Roberto Lima",
            "desconto": "12%"
        },
        {
            "dataMovimentacao": "2024-08-25",
            "quantidadeTotal": 120,
            "tipoMovimentacao": "Compra",
            "cliente": "Paula Oliveira",
            "desconto": "7%"
        }
    ]
    
    constructor(){}

    public getOrders() {
        return this.orders;
    }
}