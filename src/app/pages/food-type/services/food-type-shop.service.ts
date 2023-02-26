import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';

const API = END_POINTS.foodTypeShop;

@Injectable({
  providedIn: 'root'
})
export class FoodTypeShopService {

  constructor(private http: HttpClient) {}

  create(model: any): Observable<any> {
    return this.http.post<any>(API.add, model);
  }
  
  delete(FoodTypeId: number,ShopId: number): Observable<boolean> {
    return this.http.delete<boolean>(API.delete(FoodTypeId,ShopId));
  }
}
