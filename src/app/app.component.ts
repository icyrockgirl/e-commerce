import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  cartCount: number = 0;
  private cartSubs: Subscription;
  isAuthenticated: boolean = false;
  userName: string = 'User';

  constructor(private productsService: ProductsService, private authService: AuthService){}

  ngOnInit(){
    this.cartSubs = this.productsService.cartUpdate.subscribe((products) => {
      this.cartCount = products.reduce((sum, current) => sum + current.quantity, 0);
    })
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
    if(this.isAuthenticated){
      this.userName = localStorage.getItem('firstName');
      console.log(this.userName);
    } else{
      this.userName = 'User'
    }
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.cartSubs.unsubscribe();
  }


}
