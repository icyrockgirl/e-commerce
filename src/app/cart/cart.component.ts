import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';
import { Product, ProductsService } from '../services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartArray: Product[] = [];
  subtotal: number = 0;
  cartQuantity: number = 0;
  itemQuantity: number;

  constructor(private productsService: ProductsService, private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.productsService.cartUpdate.subscribe((products: Product[]) => {
      this.cartArray = products;
    });
    this.cartArray = this.productsService.cartItems;
    this.calculatePrice();
  }

  onDeleteItem(id: number){
    this.productsService.deleteCartItems(id);
    this.calculatePrice();
  }

  onChangeQuantity(id: number){
    this.productsService.addToCart(id);
    this.calculatePrice();
  }

  updateCart(quant: number, id: number){
    if(quant == 0){
      this.productsService.deleteCartItems(id);
    }
    this.productsService.updateCart(quant, id);
    this.calculatePrice();
  }

  calculatePrice(){
    this.subtotal = 0; this.cartQuantity = 0;
    this.cartArray.forEach((product) => {
      this.subtotal += product.price * product.quantity;
      this.cartQuantity += product.quantity
    });
  }

  onCheckout(){
    this.checkoutService.finalCart = this.cartArray;
    this.checkoutService.totalCartPrice = this.subtotal;
    this.checkoutService.totalCartQuantity = this.cartQuantity;
  }

}
