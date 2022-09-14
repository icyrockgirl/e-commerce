import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Product, ProductsService } from "../services/products.service";

@Injectable({providedIn: 'root'})

export class ProductResolver implements Resolve<Product[]>{

  constructor(private productsService: ProductsService){}

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      const products = this.productsService.sendProducts();
      if(products == undefined || products?.length == 0){
        return this.productsService.getProducts()
      } else{
        return products
      }
   }
}
