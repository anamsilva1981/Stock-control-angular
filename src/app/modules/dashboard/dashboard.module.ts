import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { ChartModule } from 'primeng/chart';
import { SharedModule } from 'app/shared/shared.module';

import { dashboard_routes } from './dashboard.routing';
import { SidebarModule } from 'primeng/sidebar';
import { DashboardHomeComponent } from './page/dashboard-home/dashboard-home.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(dashboard_routes),
    // PrimeNg
    SidebarModule,
    ButtonModule,
    ToolbarModule,
    CardModule,
    ToastModule,
    ChartModule,
    SharedModule
  ],
  declarations: [DashboardHomeComponent],
  providers: [MessageService, CookieService],
})
export class DashboardModule { }
