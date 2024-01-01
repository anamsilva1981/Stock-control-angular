import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categories } from 'app/models/interfaces/categories/categories';
import { CategoriesService } from 'app/services/categories/categories.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-form',
  // templateUrl: './product-form.component.html',
  templateUrl: './product-form.component.html',
  styleUrls: []
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private categoriesService = inject(CategoriesService);
  private formBuilder = inject(FormBuilder);
  private messageService = inject(MessageService);
  private router = inject(Router);

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


  public handleSubmitAddProduct(){}


  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
