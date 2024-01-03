import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FilterMatchMode, PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [ToastModule, ReactiveFormsModule, RouterModule],
})

export class AppComponent implements OnInit {
  title = 'stock-control';
  private primengConfig = inject(PrimeNGConfig);

  constructor(private primeNgConfig: PrimeNGConfig) {}

  public ngOnInit(): void {
    this.primeNgConfig.ripple = true;
    this.primeNgConfig.setTranslation({
      apply: 'Aplicar',
      clear: 'Limpar'
    })
    this.primengConfigRipple();
    this.primengConfigZindex();
    this.primengConfigFilterMatch();
    this.primengConfigSetTranslation();
  }
  public primengConfigFilterMatch(): void {
    this.primengConfig.filterMatchModeOptions = {
      text: [
        FilterMatchMode.STARTS_WITH,
        FilterMatchMode.CONTAINS,
        FilterMatchMode.NOT_CONTAINS,
        FilterMatchMode.ENDS_WITH,
        FilterMatchMode.EQUALS,
        FilterMatchMode.NOT_EQUALS,
      ],
      numeric: [
        FilterMatchMode.EQUALS,
        FilterMatchMode.NOT_EQUALS,
        FilterMatchMode.LESS_THAN,
        FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
        FilterMatchMode.GREATER_THAN,
        FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
      ],
      date: [
        FilterMatchMode.DATE_IS,
        FilterMatchMode.DATE_IS_NOT,
        FilterMatchMode.DATE_BEFORE,
        FilterMatchMode.DATE_AFTER,
      ],
    };
  }

  public primengConfigSetTranslation(): void {
    this.primengConfig.setTranslation({
      accept: 'Accept',
      reject: 'Cancel',
      //translations
    });
  }

  public primengConfigRipple(): void {
    this.primengConfig.ripple = true;
  }

  public primengConfigZindex(): void {
    this.primengConfig.zIndex = {
      modal: 1100, // dialog, sidebar
      overlay: 1000, // dropdown, overlaypanel
      menu: 1000, // overlay menus
      tooltip: 1100, // tooltip
    };
  }
}
