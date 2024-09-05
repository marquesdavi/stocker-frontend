import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { NewOrderComponent } from './orders/new-order/new-order.component';

export const routes: Routes = [
    { path: '', component: ProductsComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'new-order', component: NewOrderComponent }
];
