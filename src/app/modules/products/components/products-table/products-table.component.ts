import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductEvent } from 'app/models/enums/products/ProductEvent';
import { EventAction } from 'app/models/interfaces/event/eventAction';
import { Products } from 'app/models/interfaces/products/products';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: []
})
export class ProductsTableComponent {
  @Input() public products: Array<Products> = [];
  @Output() public productEvent = new EventEmitter<EventAction>()

  public productSelected!: Products;
  public addProductEvent = ProductEvent.ADD_PRODUCT_EVENT;
  public editProductEvent = ProductEvent.EDIT_PRODUCT_EVENT;

  public handleProductEvent(action: string, id?: string): void {
    if (action && action !== '') {
      const productionEventData = id && id !== ''? {action, id} : {action};
      this.productEvent.emit(productionEventData)

    }
  }

}
