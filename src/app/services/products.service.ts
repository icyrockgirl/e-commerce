import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


export interface Product{
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {rate: number, count: number},
    quantity?: number
}

@Injectable({
  providedIn: 'root'
})

export class ProductsService{

  products: Product[];
  cartArray: Product[] = [];
  resultArr: Product[] = [];
  cartUpdate = new Subject<Product[]>()

  constructor(private http: HttpClient){}

  getProducts(){
    return this.http.get<Product[]>('https://fakestoreapi.com/products', {
      headers: new HttpHeaders({'Access-Control-Allow-Origin' : '*'})
    });
  }

  receiveProducts(products: Product[]){
    this.products = products
  }

  sendProducts(){
    return this.products
  }

  addToCart(id: number){
    let productIndex = this.products.findIndex(obj => obj.id == id);
    this.cartArray.push(this.products[productIndex]);
    this.filterData();
    this.cartUpdate.next(this.resultArr.slice());
  }

  filterData(){
    this.resultArr= [...this.cartArray.reduce((mp, o) => {
      const key = JSON.stringify([o.id, o.title, o.price, o.description, o.category, o.image, o.rating]);
      if (!mp.has(key)) mp.set(key, { ...o, quantity: 0 });
      mp.get(key).quantity++;
      return mp;
    }, new Map).values()];
  }

  updateCart(quant: number, id: number){
    const index = this.resultArr.map(obj => obj.id).indexOf(id);
    if(index > -1){
      this.resultArr[index]['quantity'] = quant
    }
    this.cartArray = [...this.resultArr];
    this.cartUpdate.next(this.resultArr.slice());
  }

  get cartItems(){
    return this.resultArr.slice()
  }

  resetCart(cart){
    this.cartArray = cart;
    this.resultArr = cart;
    this.cartUpdate.next(this.resultArr.slice());
  }

   deleteCartItems(id){
    this.cartArray = this.cartArray.filter(item => item.id !== id);
    this.filterData();
    this.cartUpdate.next(this.resultArr.slice());
  }

}
