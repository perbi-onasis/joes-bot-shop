import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../catalog/product.module'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  @Input() product!: IProduct;
  @Output() buy = new EventEmitter()

  getDiscountedClasses(product: IProduct){
    // return {strikethrough: product.discount > 0};
    if(product.discount > 0){
      return 'strikethrough bold'
    }else{
      return ''
    }
  }

  buyButtonClicked(product: IProduct){
    this.buy.emit();
  }

}
