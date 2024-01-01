import { Response } from 'express';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categories } from 'app/models/interfaces/categories/categories';
import { CreateProductRequest } from 'app/models/interfaces/products/products';
import { CategoriesService } from 'app/services/categories/categories.service';
import { ProductsService } from 'app/services/products/products.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

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

  public selectedCategory: Array<{ name: string, code: string}> = [];
  public categoriesDatas: Array<Categories> = [];
  public addProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    category_id: ['', Validators.required],
    amount: [0, Validators.required],
  })

  public ngOnInit() {
    this.getAllCategories();
  }

  public getAllCategories() {
    this.categoriesService.getAllCategories()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response)=> {
        if (response.length > 0){
          this.categoriesDatas = response
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

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
