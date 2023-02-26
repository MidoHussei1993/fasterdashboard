import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { Dropdown, List } from 'src/app/shared';
import { ProductBranchFilter, ProductBranch } from '../models';

const API = END_POINTS.BranchProduct;

@Injectable({
  providedIn: 'root'
})
export class ProductBranchService {

  constructor(private http: HttpClient) {}

  create(model: ProductBranchFilter): Observable<ProductBranch> {
    return this.http.post<ProductBranch>(API.add, model);
  }

  get(filter:ProductBranchFilter): Observable<List<ProductBranch>> {
    return this.http.get<List<ProductBranch>>(API.search, { params: { 
      ...(filter.PageSize && {PageSize: filter.PageSize}),
      ...(filter.PageNumber && {PageNumber: filter.PageNumber}),
      ...(filter.IsActive && {ApplicationUserId: filter.IsActive}),
      ...(filter.ProductId && {ProductId: filter.ProductId}),
      ...(filter.ShopBranchId && {ShopBranchId: filter.ShopBranchId}),
       ...(filter.CreateAtFrom && {CreateAtFrom: String(moment(filter.CreateAtFrom).format('YYYY-MM-DD HH:mm:ss'))}),
       ...(filter.CreateAtTo && {CreateAtTo: String(moment(filter.CreateAtTo).format('YYYY-MM-DD HH:mm:ss'))}),
       } });
  }

  ChangeActivationById(model: {id:number,isActive:boolean}): Observable<ProductBranch> {
    return this.http.put<ProductBranch>(API.ChangeActivationById, model);
  }


  getShopBranchDDL(id:number): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.getShopBranchDDL, { params: { 
      shopId: id
       } });
  }

}
