import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './home/product-details/product-details.component';
import { ProductResolver } from './guards/product-resolver.service';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';

const routes: Routes = [
  { path: '',  redirectTo: '/shop', pathMatch: 'full' },
  { path: 'shop', component: HomeComponent, resolve: [ProductResolver]},
  { path: 'shop/:id', component: ProductDetailsComponent, resolve: [ProductResolver]},
  { path: 'cart', component: CartComponent},
  { path: 'auth', component: AuthComponent},
 // { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
  { path: 'checkout', component: CheckoutComponent, canDeactivate: [CanDeactivateGuard]},
  { path: 'order-history', component: OrderHistoryComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
