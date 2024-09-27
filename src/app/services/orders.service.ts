import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

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

    constructor() { }
    // headers = new Headers({
      headers = { 'AccessToken': 'eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzdG9ja2VyLWF1dGgiLCJzdWIiOiJkOTA5MjJkMy1lYTlkLTQ1NTUtODczYS1iZWU1ZjA2YzQ4NTkiLCJleHAiOjE3Mjc0MDI5OTUsImlhdCI6MTcyNzM5OTM5NSwic2NvcGUiOiJVU0VSIiwicm9sZXMiOlsiVVNFUiJdfQ.gvX_8irygSpGjFoxSHpMv-TDZ5vAnqz8XWLKQf9iCRUYhR4NoggyiQZ4KCVfSfUSNtqoLD6D1rt56HM2VPEbQYYNV4zGUg4dLKByQlBJKJBHx_JryHnpfu4cVIBXhqFSjDSL_nSULYVRicYdvO9Veqrdfir_-VvrRf94TlqLCisvorPZ-2VkLs5C1zUaAgAqNVvp6ZW7Du5hQ_cd_p2sM2W7yKsvflit4JtK6YVrGPuxOH19BHxFvNFU4DHX7bAQvLPHeWiJHLts4uPvFgkTrhuvOyFSDfjSl-geelGoRs9638rsU55IOwnuALPIBqL4UoSPWjbA7aMY1kNc5q6R_A'}
    // })
    public getOrders() {
        return this.orders;
        // return this.http.get('http://localhost:8080/movement', { headers: this.headers });
    }
}