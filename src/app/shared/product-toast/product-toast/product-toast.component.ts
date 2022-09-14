import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-product-toast',
  templateUrl: './product-toast.component.html',
  styles: [`
      .container{
        position: fixed;
        top: 10vh;
        right: 5vw;
        width: max-content;
        z-index: 100;
      }
      .alert-body{
        background-color: white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.26);
        border: 1px solid grey;
        border-radius: 5px;
        padding: 0 15px;
      }
      .alert-header{
        display: inline-flex;
        align-items: center;
      }
      .message{
        margin-top: 1rem;
      }
      `]
})
export class ProductToastComponent implements OnInit {

  @Input() productName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
