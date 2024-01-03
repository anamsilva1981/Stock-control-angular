import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductEvent } from 'app/models/enums/products/ProductEvent';
import { DeleteProductAction } from 'app/models/interfaces/products/event/DeleteProductAction';
import { EventAction } from 'app/models/interfaces/products/event/EventAction';
import { GetAllProductsResponse } from 'app/models/interfaces/products/response/GetAllProductsResponse';
import { ShortenPipe } from '../../../shared/pipes/shorten/shorten.pipe';
import { CurrencyPipe } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';


@Component({
    selector: 'app-products-table',
    templateUrl: './products-table.component.html',
    styleUrls: [],
    standalone: true,
    imports: [
        CardModule,
        TableModule,
        SharedModule,
        ButtonModule,
        TooltipModule,
        CurrencyPipe,
        ShortenPipe,
    ],
})
export class ProductsTableComponent {
  @Input() products: Array<GetAllProductsResponse> = [];
  @Output() productEvent = new EventEmitter<EventAction>();
  @Output() deleteProductEvent = new EventEmitter<DeleteProductAction>();

  public productSelected!: GetAllProductsResponse;
  public addProductEvent = ProductEvent.ADD_PRODUCT_EVENT;
  public editProductEvent = ProductEvent.EDIT_PRODUCT_EVENT;

  handleProductEvent(action: string, id?: string): void {
    if (action && action !== '') {
      const productEventData = id && id !== '' ? { action, id } : { action };
      this.productEvent.emit(productEventData);
    }
  }

  handleDeleteProduct(product_id: string, productName: string): void {
    if (product_id !== '' && productName !== '') {
      this.deleteProductEvent.emit({
        product_id,
        productName,
      });
    }
  }
}
