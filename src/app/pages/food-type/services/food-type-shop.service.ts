import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { List } from 'src/app/shared';
import { FoodTypeShopFilter } from '../models/food-type-shop-filter';

const API = END_POINTS.foodTypeShop;

@Injectable({
  providedIn: 'root',
})
export class FoodTypeShopService {
  constructor(private http: HttpClient) {}
  get(filter: FoodTypeShopFilter): Observable<List<any>> {
    return this.http.get<List<any>>(API.search, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.ShopId && { ShopId: filter.ShopId }),
        ...(filter.FoodTypeId && { FoodTypeId: filter.FoodTypeId }),
        ...(filter.ProductDetailsId && {
          ProductDetailsId: filter.ProductDetailsId,
        }),
      },
    });
  }

  create(model: any): Observable<any> {
    return this.http.post<any>(API.add, model);
  }

  delete(FoodTypeId: number): Observable<boolean> {
    return this.http.delete<boolean>(API.delete(FoodTypeId));
  }
}
