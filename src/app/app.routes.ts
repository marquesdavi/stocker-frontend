import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { NewOrderComponent } from './components/orders/new-order/new-order.component';
import { AdminComponent } from './components/admin/admin.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AuthGuard } from './guards/authGuard';
import { AdminGuard } from './guards/adminGuard';
import { CustomersComponent } from './components/customers/customers.component';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
    { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
    { path: 'new-order', component: NewOrderComponent, canActivate: [AuthGuard] },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
    { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard] }
];
