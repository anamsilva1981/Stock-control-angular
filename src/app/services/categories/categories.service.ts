import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Categories } from 'app/models/interfaces/categories/categories';
import { environments } from 'environment/environment.prod';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private httpClient = inject(HttpClient);
  private coockieService = inject(CookieService);

  private urlApi = environments.urlApi;
  private jwtToken = this.coockieService.get('USER_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.jwtToken}`
    })
  }

  public getAllCategories(): Observable<Array<Categories>>{
    return this.httpClient.get<Array<Categories>>(
      `${this.urlApi}/categories`,
      this
      .httpOptions
    )

  }



}
