import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  finalCart: Product[];
  totalCartPrice: number;
  totalCartQuantity: number;

  constructor(private http: HttpClient) { }

  saveOrder(cart){ // should be replaced with a checkout api
    return this.http.post('https://ng-shopping-cart-f72ee-default-rtdb.firebaseio.com/cart.json', cart)
  }

  cart = [];
  fetchOrder(){
    return this.http.get('https://ng-shopping-cart-f72ee-default-rtdb.firebaseio.com/cart.json')
    .pipe(map(data => {
       Object.values(data).map(cart => {
        cart.forEach(item => {
         this.cart.push(item)
        })
      })
      return this.cart
    }))
  }

}
