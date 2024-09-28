import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "./authentication.service";

@Injectable({
    providedIn: 'root',
})
export class OrdersService {
    orders = [
        {
            "id": 1,
            "dataMovimentacao": "2024-08-01",
            "quantidadeTotal": 100,
            "tipoMovimentacao": "Venda",
            "cliente": "João Silva",
            "desconto": "15%"
        },
        {
            "id": 2,
            "dataMovimentacao": "2024-08-05",
            "quantidadeTotal": 50,
            "tipoMovimentacao": "Compra",
            "cliente": "Maria Souza",
            "desconto": "10%"
        },
        {
            "id": 3,
            "dataMovimentacao": "2024-08-10",
            "quantidadeTotal": 200,
            "tipoMovimentacao": "Venda",
            "cliente": "Carlos Pereira",
            "desconto": "5%"
        },
        {
            "id": 4,
            "dataMovimentacao": "2024-08-15",
            "quantidadeTotal": 75,
            "tipoMovimentacao": "Compra",
            "cliente": "Fernanda Costa",
            "desconto": "8%"
        },
        {
            "id": 5,
            "dataMovimentacao": "2024-08-20",
            "quantidadeTotal": 150,
            "tipoMovimentacao": "Venda",
            "cliente": "Roberto Lima",
            "desconto": "12%"
        },
        {
            "id": 6,
            "dataMovimentacao": "2024-08-25",
            "quantidadeTotal": 120,
            "tipoMovimentacao": "Compra",
            "cliente": "Paula Oliveira",
            "desconto": "7%"
        }
    ]

    constructor(
        private authService: AuthenticationService,
    ) {}

    public getOrders() {
        return this.orders;
        // return this.http.get('http://localhost:8080/movement', { headers: this.headers });
    }
}