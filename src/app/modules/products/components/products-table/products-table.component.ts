import { Component, Input, OnInit } from '@angular/core';
import { Products } from 'app/models/interfaces/products/products';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: []
})
export class ProductsTableComponent implements OnInit {
  @Input() public products: Array<Products> = [];

  public productSelected!: Products;

  public ngOnInit() {
  }

}
