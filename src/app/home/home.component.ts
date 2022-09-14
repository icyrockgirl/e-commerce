import { Component, ComponentFactoryResolver, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { ProductToastComponent } from '../shared/product-toast/product-toast/product-toast.component';
import { Product, ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

  @ViewChild(PlaceholderDirective) toastHost: PlaceholderDirective;

  productsList: Product[];
  category: string = 'All';
  priceCategory: string = '';
  private toastTimer: any;
  isLoading: boolean = false;

  constructor(private productsService: ProductsService, private router: Router,
    private route: ActivatedRoute, private componentFactoryResolver: ComponentFactoryResolver,
    private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.productsService.getProducts().subscribe((data: Product[]) => {
      this.isLoading = false;
      this.productsList = data;
      this.productsService.receiveProducts(this.productsList);
    });
  }

  navigateToDetails(id: number){
    this.router.navigate([id], {relativeTo: this.route});
  }

  addToCart(id: number, title: string){
    this.productsService.addToCart(id);
    this.showToast(title)
  }

  onClickCategory(ddValue: string){
    this.category = ddValue;
  }

  onClickPrice(priceCategory: string){
      this.priceCategory = priceCategory;
  }

  public showToast(title: string){
    const toastCmp = this.componentFactoryResolver.resolveComponentFactory(ProductToastComponent);
    const hostAlert = this.toastHost.viewContainerRef;
    hostAlert.clear();
    const cmpRef = hostAlert.createComponent(toastCmp);
    cmpRef.instance.productName = title;

    this.toastTimer = setTimeout(() => {
      hostAlert.clear()
    }, 2000)
  }

  ngOnDestroy(): void {
    clearTimeout(this.toastTimer)
  }


}
