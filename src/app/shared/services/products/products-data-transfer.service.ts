import { Injectable } from '@angular/core';
import { Products } from 'app/models/interfaces/products/products';
import { BehaviorSubject, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataTransferService {
  
  public productsDataEmitter$ = new BehaviorSubject<Array<Products> | null>(null);
  public productsDatas: Array<Products> = [];

  public setProductsDatas(products: Array<Products>): void {
    if (products){
      this.productsDataEmitter$.next(products);
      this.getProductsData();
    }
  }

  public getProductsData() {
    this.productsDataEmitter$.pipe(take(1),
    map((data) => data?.filter((product) => product.amount > 0))).subscribe({
      next: (response => {
        if(response) {
          this.productsDatas = response;
        }
      })
    });

    return this.productsDatas;
  }

}
