import { Component, ComponentFactoryResolver, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { PlaceholderDirective } from '../../shared/placeholder.directive';
import { ActivatedRoute, Params } from '@angular/router';
import { Product, ProductsService } from 'src/app/services/products.service';
import { HomeComponent } from '../home.component';
import { ProductToastComponent } from 'src/app/shared/product-toast/product-toast/product-toast.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  @ViewChild(PlaceholderDirective) toastHost: PlaceholderDirective;

  productItem: Product;
  id: number;
  private toastTimer: any;

  constructor(private productsService: ProductsService, private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
    this.route.data.subscribe((response: any) => {
     // this.productItem = response[0][this.id - 1];
      this.productItem = response[0].filter(obj => obj.id == this.id)[0];
      console.log(this.productItem);
    });
  }

  addItem(title: string){
    this.productsService.addToCart(this.id);
    this.showToast(title);
  }

  public showToast(title: string){
    const toastCmp = this.componentFactoryResolver.resolveComponentFactory(ProductToastComponent);
    const hostCmp = this.toastHost.viewContainerRef;
    hostCmp.clear();
    const cmpRef = hostCmp.createComponent(toastCmp);
    cmpRef.instance.productName = title;

    this.toastTimer = setTimeout(() => {
      hostCmp.clear()
    }, 2000)
  }

  ngOnDestroy(): void {
    clearTimeout(this.toastTimer)
  }

}
