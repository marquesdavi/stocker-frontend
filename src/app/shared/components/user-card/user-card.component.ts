import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UpdateUserStatus, UserStatus } from '../../../enums/status.enum';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() nome: string = '';
  @Input() cargo: string = '';
  @Input() status: UpdateUserStatus  = UpdateUserStatus.INACTIVE;
  
  @Output() clientStatusToggler = new EventEmitter<void>();

  clientStatusToggle() {
    this.clientStatusToggler.emit();
  }
}
