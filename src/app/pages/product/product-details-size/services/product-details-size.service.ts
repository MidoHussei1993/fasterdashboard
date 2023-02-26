import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { List } from 'echarts';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { ProductDetailsSizeList } from '../models';

const API = END_POINTS.Product;

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsSizeService {
  constructor(private http: HttpClient) {}

  create(model: any): Observable<ProductDetailsSizeList[]> {
    return this.http.post<ProductDetailsSizeList[]>(API.AddProductDetailSize, model);
  }

  get(id:number): Observable<List<any>> {
    return this.http.get<List<any>>(API.getProductDetailsSizesByProductDetailsId(id));
  }

  getByID(id: number): Observable<any> {
    return this.http.get<any>(API.GetDetailsSizeById(id));
  }

  update(model: any): Observable<any> {
    return this.http.put<any>(API.UpdateProductDetailSize , model);
  }
}