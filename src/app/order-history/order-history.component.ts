import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orders = [];
  page = 1;
  pageSize = 10;

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.checkoutService.fetchOrder().subscribe(data => {
      this.orders = data
    })
  }

}
