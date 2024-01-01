import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CreateProductRequest, CreateProductResponse, Product, Products } from 'app/models/interfaces/products/products';
import { environments } from 'environment/environment.prod';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
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

  public getAllProducts(): Observable<Array<Products>>{
    return this.httpClient.get<Array<Products>>(
      `${this.urlApi}/products`,
      this.httpOptions
    ).pipe(map((product) => product.filter((data) => data.amount > 0)));
  }

  public createProduct(requestDatas: CreateProductRequest): Observable<CreateProductResponse>{
    return this.httpClient.post<CreateProductResponse>(
      `${this.urlApi}/product`, requestDatas, this.httpOptions,
    )
  }

  public deleteProduct(product_id: string): Observable<Product>{
    return this.httpClient.delete<Product>(
      `${this.urlApi}/product/delete`,
      {
        ...this.httpOptions, params: {
          product_id: product_id,
        }
      }
    )
  }


}
