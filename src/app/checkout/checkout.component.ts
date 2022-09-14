import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartComponent } from '../cart/cart.component';
import { CanComponentLeave } from '../guards/can-deactivate.guard';
import { CheckoutService } from '../services/checkout.service';
import { ProductsService } from '../services/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, CanComponentLeave {

  @ViewChild(CartComponent) cartComponent: CartComponent

  checkoutForm: FormGroup;
  paymentMethods = ['Credit Card', 'Debit Card', 'Paypal'];
  places = [
    {
      state: 'California',
      city: ['Sacramento', 'Los Angeles']
    },
    {
      state: 'Georgia',
      city: ['Atlanta']
    },
    {
      state: 'Kansas',
      city: ['Topeka', 'Wichita']
    }
];
  cities: any;
  isLoading: boolean = false;
  showFinalPage: boolean = false;

  constructor(private checkoutService: CheckoutService, private productsService: ProductsService) {}

  ngOnInit(): void {
    this.checkoutForm = new FormGroup({
      'billingAddress': new FormGroup({
        'firstName': new FormControl(null, Validators.required),
        'lastName': new FormControl(null, Validators.required),
        'email': new FormControl(null, Validators.email),
        'mobile': new FormControl(null, [Validators.required, Validators.pattern(/[0-9]{3}-[0-9]{2}-[0-9]{3}/)]),
        'address1': new FormControl(null, Validators.required),
        'address2': new FormControl(null),
        'state': new FormControl(null, Validators.required),
        'city': new FormControl(null, Validators.required),
        'zip': new FormControl(null, Validators.required)
      }),
      'paymentDetails': new FormGroup({
        'paymentMethod': new FormControl('Credit Card'),
        'cardName': new FormControl(null, Validators.required),
        'cardNumber': new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
        'expiration': new FormControl(null, [Validators.required, Validators.pattern(/^(0\d|1[0-2])\/\d{2}$/), this.dateValidator]),
        'cvv': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{3}$')])
      })
    })
  }

  get cartArray(){
    return this.checkoutService.finalCart
  }

  get cartQuantity(){
    return this.checkoutService.totalCartQuantity
  }

  get cartPrice(){
    return this.checkoutService.totalCartPrice
  }


  dateValidator(control: FormControl): {[s: string]: boolean}{
    if(control.value !== null){
      if (control.value.match(/^(0\d|1[0-2])\/\d{2}$/)) {
        const {0: month, 1: year} = control.value.split("/");
        const expiry = new Date(20+year, month - 1);
        const current = new Date();
        if(expiry.getTime() < current.getTime()){
          return {invalidDate: true}
        }
      } else return null;
    }
  }

  onSubmit(){
    this.isLoading = true;
    this.checkoutForm.reset();
    this.checkoutService.saveOrder(this.cartArray).subscribe(() => {
      this.isLoading = false;
      this.showFinalPage = true;
      this.productsService.cartUpdate.next([]);
      this.productsService.resetCart([]);
    }, err => {
      this.isLoading = false;
      this.showFinalPage = false;
      alert('Something went wrong. Please try again later!');
    })
  }

  onSelectState(state){
    if(state == 'Choose'){
      this.cities = [];
    } else{
      let index = this.places.findIndex(obj => obj.state == state);
      this.cities = this.places[index].city;
      console.log(this.cities);
    }
  }

  canLeave(): boolean | Observable<boolean> | Promise<boolean>{
      if(this.checkoutForm.pristine){
        return true
      } else{
        return confirm("You have unsaved changes. Are you sure you want to navigate?")
      }
  }
}
