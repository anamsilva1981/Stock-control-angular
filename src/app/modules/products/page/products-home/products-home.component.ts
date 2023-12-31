import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from 'app/models/interfaces/products/products';
import { ProductsService } from 'app/services/products/products.service';
import { ProductsDataTransferService } from 'app/shared/services/products/products-data-transfer.service';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: []
})
export class ProductsHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  private productsList: Array<Products> =[];

  private productsService = inject(ProductsService);
  private productsDtService = inject(ProductsDataTransferService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  public ngOnInit() {
    this.getServiceProductsDatas();
  }

  public getServiceProductsDatas() {
    const productsLoaded = this.productsDtService.getProductsData();

    if (productsLoaded.length > 0){
      this.productsList = productsLoaded;
      console.log('Dados de produtos ',this.productsList );
    } else this.getApiProductsDatas();
  }

  public getApiProductsDatas() {
    this.productsService.getAllProducts().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        if (response.length > 0){
          this.productsList = response;

          console.log('Dados de produtos ',this.productsList );
        }
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar produtos',
          life: 4000,
        })
        this.router.navigate(['/dashboard']);

      }
    })
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
