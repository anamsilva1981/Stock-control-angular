import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categories } from 'app/models/interfaces/categories/categories';
import { CreateProductRequest, EditProductResponse, Products } from 'app/models/interfaces/products/products';
import { CategoriesService } from 'app/services/categories/categories.service';
import { ProductsService } from 'app/services/products/products.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EventAction } from 'app/models/interfaces/event/eventAction';
import { ProductsDataTransferService } from 'app/shared/services/products/products-data-transfer.service';
import { ProductEvent } from 'app/models/enums/products/ProductEvent';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: []
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private categoriesService = inject(CategoriesService);
  private productService = inject(ProductsService);
  private formBuilder = inject(FormBuilder);
  private messageService = inject(MessageService);
  private productDtService = inject(ProductsDataTransferService);

  public addProductAction = ProductEvent.ADD_PRODUCT_EVENT;
  public editProductAction = ProductEvent.EDIT_PRODUCT_EVENT;
  public saleProductAction = ProductEvent.SALE_PRODUCT_EVENT;
  public productDatas: Array<Products> = [];
  public productSelectedDatas!: Products;
  public renderDropDown = false;

  public selectedCategory: Array<{ name: string, code: string}> = [];
  public categoriesDatas: Array<Categories> = [];
  public productAction!: {
    event: EventAction,
    productDatas: Array<Products>;
  }
  public addProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    category_id: ['', Validators.required],
    amount: [0, Validators.required],
  })
  public editProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    amount: [0, Validators.required],
    category_id: ['', Validators.required],
  })

  constructor(public ref: DynamicDialogConfig){}

  public ngOnInit(): void {
    this.productAction = this.ref.data

    this.productAction?.event?.action === this.saleProductAction &&
      this.getProductDatas();

    this.getAllCategories();
    this.renderDropDown = true;
  }

  public getAllCategories() {
    this.categoriesService.getAllCategories()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response)=> {
        if (response.length > 0){
          this.categoriesDatas = response

          if (
            this.productAction?.event?.action === this.editProductAction &&
            this.productAction?.productDatas
          ) {
            this.getProductSelectedDatas(this.productAction?.event?.id as string);
          }
        }
      }
    })
  }

  public handleSubmitAddProduct(){
    if (this.addProductForm?.value && this.addProductForm?.valid){
      const requestCreateProduct: CreateProductRequest = {
        name: this.addProductForm.value.name as string,
        price: this.addProductForm.value.price as string,
        description: this.addProductForm.value.description as string,
        category_id: this.addProductForm.value.category_id as string,
        amount: Number(this.addProductForm.value.amount)
      }

      this.productService.createProduct(requestCreateProduct)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response){
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Produto criado com sucesso!',
              life: 4000
            })
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
              summary: 'Erro',
              icon: 'pi pi-exclamation-triangle',
              detail: 'Erro ao criar produto!',
              life: 4000
          })
        }
      })
    }

    this.addProductForm.reset();
  }

  public handleSubmitEditProduct(): void {
    if (
      this.editProductForm.value &&
      this.editProductForm.valid &&
      this.productAction.event.id
    ) {
      const requestEditProduct: EditProductResponse = {
        name: this.editProductForm.value.name as string,
        price: this.editProductForm.value.price as string,
        description: this.editProductForm.value.description as string,
        product_id: this.productAction?.event?.id,
        category_id: this.productAction?.event?.id as string,
        amount: this.editProductForm.value.amount as number,
      };

      this.productService
        .editProduct(requestEditProduct)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Produto editado com sucesso!',
              life: 4000,
            });
            this.editProductForm.reset();
          },
          error: (err) => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao editar produto!',
              life: 2500,
            });
            this.editProductForm.reset();
          },
        });
    }
  }

  public getProductDatas(): void {
    this.productService.getAllProducts()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response)=> {
        if (response.length > 0){
          this.productDatas == response;
          this.productDatas && this.productDtService.setProductsDatas(this.productDatas)
        }
      },
      error: ()=> {}
    })
  }

  public getProductSelectedDatas(productId: string): void {
    const allProducts = this.productAction?.productDatas;

    if (allProducts.length > 0){
      const productFiltered = allProducts.filter((element) => element?.id === productId)

      if (productFiltered) {
        this.productSelectedDatas = productFiltered[0];

        this.editProductForm.setValue({
          name: this.productSelectedDatas?.name,
          price: this.productSelectedDatas?.price,
          amount: this.productSelectedDatas?.amount,
          description: this.productSelectedDatas?.description,
          category_id: this.productSelectedDatas?.category?.id,
        })
      }
    }

  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
