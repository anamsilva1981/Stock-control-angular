import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductEvent } from 'app/models/enums/products/ProductEvent';
import { ProductFormComponent } from 'app/modules/products/product-form/product-form.component';
import { CookieService } from 'ngx-cookie-service';
import { DialogService } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';


@Component({
    selector: 'app-toolbar-navigation',
    templateUrl: './toolbar-navigation.component.html',
    styleUrls: [],
    standalone: true,
    imports: [
        ToolbarModule,
        ButtonModule,
        RouterLink,
        RouterLinkActive,
    ],
})
export class ToolbarNavigationComponent {
  constructor(
    private cookie: CookieService,
    private router: Router,
    private dialogService: DialogService
  ) { }

  handleLogout(): void {
    this.cookie.delete('USER_INFO');
    void this.router.navigate(['/home']);
  }

  handleSaleProduct(): void {
    const saleProductAction = ProductEvent.SALE_PRODUCT_EVENT;

    this.dialogService.open(ProductFormComponent, {
      header: saleProductAction,
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        event: { action: saleProductAction },
      },
    });
  }
}
