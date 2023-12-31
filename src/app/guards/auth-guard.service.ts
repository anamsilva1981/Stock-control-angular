import { Injectable, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { UserService } from 'app/services/users/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  private userService = inject(UserService);
  private router = inject(Router);

  public canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.userService.isLoggedIn()){
      this.router.navigate(['/home']);
      return false
    }
    
    this.userService.isLoggedIn();
    return true
  }

}
