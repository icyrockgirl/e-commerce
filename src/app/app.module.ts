import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthComponent } from './auth/auth.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ProductDetailsComponent } from './home/product-details/product-details.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { DocumentClickDirective } from './shared/document-click.directive';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CheckoutReviewComponent } from './checkout/checkout-review/checkout-review.component';import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { FilterPipe } from './shared/filter.pipe';
import { SortPipe } from './shared/sort.pipe';
import { ProductToastComponent } from './shared/product-toast/product-toast/product-toast.component';
import { PlaceholderDirective } from './shared/placeholder.directive';
;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    CheckoutComponent,
    AuthComponent,
    OrderHistoryComponent,
    ProductDetailsComponent,
    DropdownDirective,
    DocumentClickDirective,
    CheckoutReviewComponent,
    FilterPipe,
    SortPipe,
    ProductToastComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
