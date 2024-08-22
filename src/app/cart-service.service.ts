import { Injectable } from '@angular/core';
import { IProduct } from './catalog/product.module';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  
  cart: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);
  constructor(private http: HttpClient) { 
    this.http.get<IProduct[]>('/api/cart').subscribe({
      next: (cart) => this.cart.next(cart)
    })
  }

  add(product: IProduct){
    const currentCart = this.cart.value;
    const updatedCart = [...currentCart, product];
    this.cart.next(updatedCart);
    this.http.post('/api/cart', updatedCart).subscribe(()=> {
      console.log(`product ${product.name} added to cart`);
    });

    
  } 

  remove(product: IProduct){
    //   le.log(`product ${product.name} removed to cart`)
    let newCart = this.cart.getValue().filter((i) => i !== product);
    this.cart.next(newCart);
    this.http.post('/api/cart', newCart).subscribe(() => {
      console.log('removed ' + product.name + ' from cart!');
    });
  }

  getCart(): Observable<IProduct[]>{
    return this.cart.asObservable();
  }

  
}
