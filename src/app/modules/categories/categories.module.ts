import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { categories_routes } from './categories.routing';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService } from 'primeng/api';

import { CategoriesHomeComponent } from './categories-home/categories-home.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule, RouterModule.forChild(categories_routes), SharedModule, HttpClientModule,
    // PrimeNG
    CardModule,
    ButtonModule,
    TableModule,
    InputMaskModule,
    InputTextareaModule,
    InputSwitchModule,
    InputNumberModule,
    DynamicDialogModule,
    DropdownModule,
    ConfirmDialogModule,
    TooltipModule

  ],
  declarations: [CategoriesHomeComponent],
  providers: [
    DialogService, ConfirmationService
  ]

})
export class CategoriesModule { }
