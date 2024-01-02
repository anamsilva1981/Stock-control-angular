import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductEvent } from 'app/models/enums/products/ProductEvent';
import { DeleteProductionAction, EventAction } from 'app/models/interfaces/event/eventAction';
import { Products } from 'app/models/interfaces/products/products';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: []
})
export class ProductsTableComponent {
  @Input() public products: Array<Products> = [];
  @Output() public productEvent = new EventEmitter<EventAction>()
  @Output() public deleteProductEvent = new EventEmitter<DeleteProductionAction>()

  public productSelected!: Products;
  public addProductEvent = ProductEvent.ADD_PRODUCT_EVENT;
  public editProductEvent = ProductEvent.EDIT_PRODUCT_EVENT;

  public handleProductEvent(action: string, id?: string): void {
    if (action && action !== '') {
      const productionEventData = id && id !== '' ? { action, id } : { action };
      this.productEvent.emit(productionEventData)

    }
  }

  public handleDeleteProduct(product_id: string, productName: string): void {
    if (product_id !== '' && productName !== '') {
      this.deleteProductEvent.emit({
        product_id,
        productName,
      })
    }
  }

}
