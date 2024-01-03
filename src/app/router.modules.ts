import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { AuthGuard } from './guards/auth-guard.service';
import { DashboardHomeComponent } from './modules/dashboard/dashboard-home/dashboard-home.component';
import { CategoriesHomeComponent } from './modules/categories/categories-home/categories-home.component';
import { ProductsHomeComponent } from './modules/products/products-home/products-home.component';

export const dashboardsRoutes: Routes = [
  {
    path: '',
    component: DashboardHomeComponent
  },
];

export const categoriesRoutes: Routes = [
  {
    path: '',
    component: CategoriesHomeComponent
  },
];

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
];

export const productsRoutes: Routes = [
  {
    path: '',
    component: ProductsHomeComponent
  },
];

