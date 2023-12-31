import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Products } from 'app/models/interfaces/products/products';
import { ProductsService } from 'app/services/products/products.service';
import { ProductsDataTransferService } from 'app/shared/services/products/products-data-transfer.service';
import { ChartData, ChartOptions } from 'chart.js';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: []
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  
  private productsService = inject(ProductsService);
  private messageService = inject(MessageService);
  private productsDtService = inject(ProductsDataTransferService);

  public productsList: Array<Products> = [];
  public productsChartDatas!: ChartData;
  public productsChartOptions!: ChartOptions;


  public ngOnInit() {
    this.getProductsDatas();
  }

  public getProductsDatas(): void {
    this.productsService.getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.productsList = response;
            this.productsDtService.setProductsDatas(this.productsList);
            this.setProductsChartConfig();

          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar produto',
            life: 4000,
          })

        }

      })
  }

  public setProductsChartConfig(): void {
    if (this.productsList.length > 0) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecundary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.productsChartDatas = {
        labels: this.productsList.map((element) => element?.name),
        datasets: [
          {
            label: 'Quantidade',
            backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
            borderColor: documentStyle.getPropertyValue('--indigo-400'),
            hoverBackgroundColor: documentStyle.getPropertyValue('--indigo-400'),
            data: this.productsList.map((element) => element.amount),
          }
        ]
      }

      this.productsChartOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecundary,
              font: {
                weight: 500,

              }
            },
            grid: {
              color: surfaceBorder
            }
          },
          y: {
            ticks: {
              color: textColorSecundary,
            },
            grid: {
              color: surfaceBorder
            }
          },

        },
      }

    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
