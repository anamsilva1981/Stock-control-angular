import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',

  },
  {
    path: 'home',
    component: HomeComponent,

  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(
      (module) => module.DashboardModule
    ),
    canActivate: [AuthGuardService]

  },
  {
    path: 'products',
    loadChildren: () => import('./modules/products/products.module').then(
      (module) => module.ProductsModule
    ),
    canActivate: [AuthGuardService]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
