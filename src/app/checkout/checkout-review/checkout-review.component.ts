import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.css']
})
export class CheckoutReviewComponent implements OnInit {

  @Input() orderSummary;

  constructor() { }

  ngOnInit(): void {
  }

}
