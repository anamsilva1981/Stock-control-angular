import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
  styleUrls: []
})
export class ToolbarNavigationComponent implements OnInit {
  private coockieService = inject(CookieService)
  private route = inject(Router)

  constructor() { }

  public ngOnInit() {
  }

  public handleLogout(): void{
    this.coockieService.delete('USER_INFO');
    void this.route.navigate(['/home'])
  }

}
