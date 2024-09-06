import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ClientService {
    clients = [
        {
            "nome": "João Gomes",
            "cargo": "Gerente",
            "status": "Ativo"
        },
        {
            "nome": "Maria Souza",
            "cargo": "Desenvolvedora",
            "status": "Ativo"
        },
        {
            "nome": "Carlos Lima",
            "cargo": "Analista",
            "status": "Inativo"
        },
        {
            "nome": "Fernanda Alves",
            "cargo": "Gerente",
            "status": "Ativo"
        },
        {
            "nome": "Lucas Pereira",
            "cargo": "Suporte Técnico",
            "status": "Ativo"
        },
        {
            "nome": "Ana Clara",
            "cargo": "Desenvolvedora",
            "status": "Inativo"
        }

    ]
    constructor() { }

    public getClients() {
        return this.clients;
    }
}