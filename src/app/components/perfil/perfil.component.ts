import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  user: any;
  token: string = '';
  public selectedFile: File | null = null;
  constructor(
    private userService: UserService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.token = this.authService.getAuthToken();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.userService.getCurrentUser(this.token).subscribe((user) => {
      this.user = user;
      console.log(user)
    });
  }

  public onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  public uploadImage(userId: string): void {
    if (this.selectedFile) {
      this.userService.updateUserImage(userId, this.selectedFile, this.token).subscribe({
        next: (response) => {
          this.getCurrentUser();
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      console.error('No file selected');
    }
  }
}
