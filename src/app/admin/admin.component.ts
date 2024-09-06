import { Component, OnInit } from '@angular/core';
import { UserCardComponent } from "../shared/components/user-card/user-card.component";
import { ClientService } from '../services/client.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [UserCardComponent, CommonModule, NgFor],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  public clients: any
  public actives: number = 0;
  constructor(
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.getClients();
    this.countUsers();
  }

  public getClients() {
    this.clients = this.clientService.getClients();
  }

  private countUsers() {
    this.clients.forEach((client: any) => {
      if(client.status === "Ativo") this.actives +=1
    })
  }
}
