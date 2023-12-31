import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EventAction } from 'app/models/interfaces/event/eventAction';
import { Products } from 'app/models/interfaces/products/products';
import { ProductsService } from 'app/services/products/products.service';
import { ProductsDataTransferService } from 'app/shared/services/products/products-data-transfer.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: []
})
export class ProductsHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private productsService = inject(ProductsService);
  private productsDtService = inject(ProductsDataTransferService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  public productsList: Array<Products> =[];

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

  public handleProductionAction(event: EventAction): void {
    if (event){
      console.log('Dados do evnto recebido ', event);

    }
  }

  public handleDeleteProductAction(event: {product_id: string, productName: string}): void {
    if (event){
      this.confirmationService.confirm({
        message: `Confirma a exclusão do produto? ${event?.productName}`,
        header: 'Exclusão de produtos: ',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.deleteProduct(event?.product_id),
      })
    }
  }

  public deleteProduct(product_id: string){
    if (product_id) {
      this.productsService.deleteProduct(product_id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response){
            this.messageService.add({
              severity: 'sucess',
              summary: 'sucesso',
              detail: 'Produto removido com sucesso',
              life: 4000,
            });
            this.getApiProductsDatas();
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao remover produto',
            life: 4000
          })

        }
    })
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
