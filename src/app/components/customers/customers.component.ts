import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  public customers: any[] = [];
  public editMode: boolean = false;
  public selectedCustomer: any = null;
  public token: string = '';

  constructor(private customerService: CustomerService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.token = this.authService.getAuthToken();
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getCustomers(this.token).subscribe((customers) => {
      this.customers = customers;
    });
  }

  addCustomer(form: NgForm) {
    const newCustomer = {
      name: form.value.name,
      cpf: form.value.cpf,
      birthDate: form.value.birthDate,
      discountPercentage: form.value.discountPercentage || 0,
      totalPurchaseValue: form.value.totalPurchaseValue || 0,
    };

    this.customerService.addCustomer(newCustomer, this.token).subscribe(() => {
      this.loadCustomers();
      form.resetForm();
    });
  }

  saveCustomer(customer: any) {
    this.customerService.updateCustomer(customer.id, customer, this.token).subscribe(() => {
      customer.isEditing = false;
      this.loadCustomers();
    });
  }

  removeCustomer(id: string) {
    this.customerService.deleteCustomer(id, this.token).subscribe(() => {
      this.loadCustomers();
    });
  }

  searchCustomer($event: any) {
    const search = $event.target.value.toLowerCase();
    if (!search) {
      this.loadCustomers();
    } else {
      this.customers = this.customers.filter((customer: any) =>
        customer.name.toLowerCase().includes(search) || customer.cpf.includes(search)
      );
    }
  }

  editCustomer(customer: any) {
    customer.isEditing = true;
  }

  cancelEditCustomer(customer: any) {
    customer.isEditing = false;
  }
}
