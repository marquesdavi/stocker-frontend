import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { UserService } from '../../services/users.service';
import { UserCardComponent } from '../../shared/components/user-card/user-card.component';
import { UserStatus } from '../../enums/status.enum';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';


declare var bootstrap: any; // Declaração do Bootstrap para manipular o modal

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [UserCardComponent, CommonModule, NgFor, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public clients: any[] = [];
  public actives: number = 0;
  public newUser = { name: '', email: '', cpf: '', password: '' };
  public token: string = '';

  constructor(private userService: UserService, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.token = this.authService.getAuthToken();
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getUsers(this.token).subscribe((clients: any[]) => {
      this.clients = clients.map(client => ({
        ...client,
        status: client.status ? UserStatus.Ativo : UserStatus.Inativo
      }));
      this.countUsers();
    });
  }

  public toggleStatus(clientId: string): void {
    this.clients = this.clients.map(client => {
      if (client.id === clientId) {
        client.status = client.status === UserStatus.Ativo ? UserStatus.Inativo : UserStatus.Ativo;
      }
      return client;
    });
    this.countUsers();
  }

  public openModal(): void {
    const modal = new bootstrap.Modal(document.getElementById('createUserModal'));
    modal.show();
  }

  public createUser(form: NgForm): void {
    if (form.valid) {
      const newClient = {
        name: this.newUser.name,
        email: this.newUser.email,
        cpf: this.newUser.cpf,
        password: this.newUser.password,
      };

      this.userService.createUser(newClient, this.token).subscribe({
        next: (response) => {
          console.log(response)
          this.getUsers();
          this.countUsers();
          form.resetForm();
          const modal = bootstrap.Modal.getInstance(document.getElementById('createUserModal'));
          modal.hide();
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  private countUsers(): void {
    this.actives = this.clients.filter(client => client.status === UserStatus.Ativo).length;
  }
}
