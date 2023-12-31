import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SignupUserRequest, SignupUserResponse } from 'app/models/interfaces/user/signUser';
import { AuthUserRequest, AuthUserResponse } from 'app/models/interfaces/user/authUser';
import { environments } from 'environment/environment.prod';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpClient = inject(HttpClient);
  private cookieService = inject(CookieService);
  private apiUrl = environments.urlApi;

  constructor() { }

  public signupUser(requestDatas: SignupUserRequest): Observable<SignupUserResponse> {
    return this.httpClient.post<SignupUserResponse>(
      `${this.apiUrl}/user`, requestDatas)

  }

  public authUser(requestDatas: AuthUserRequest): Observable<AuthUserResponse> {
    return this.httpClient.post<AuthUserResponse>(
      `${this.apiUrl}/auth`, requestDatas
    )
  }

  public isLoggedIn(): boolean {
    const jwtToken = this.cookieService.get('USER_INFO');
    return jwtToken ? true : false;
  }
}

