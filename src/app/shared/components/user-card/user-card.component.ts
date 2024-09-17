import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() nome: string = '';
  @Input() cargo: string = '';
  @Input() status: string = '';
  
  @Output() clientStatusToggler = new EventEmitter<string>();

  clientStatusToggle(client: any) {
    this.clientStatusToggler.emit(client);
  }

}
