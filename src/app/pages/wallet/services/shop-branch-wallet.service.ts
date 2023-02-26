import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { List } from 'src/app/shared';
import { ShopBranchWalletFilter } from '../models';

const API = END_POINTS.ShopBranchWallet;

@Injectable({
  providedIn: 'root',
})
export class ShopBranchWalletService {
  constructor(private http: HttpClient) {}

  create(model: any): Observable<any> {
    return this.http.post<any>(API.add, model);
  }

  GetShopBranchWalletSum(shopBranchId): Observable<any> {
    return this.http.get<any>(API.GetShopBranchWalletSum(shopBranchId));
  }

  get(filter: ShopBranchWalletFilter): Observable<List<any>> {
    return this.http.get<List<any>>(API.search, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.Type && { Type: filter.Type }),
        ...(filter.ShopBranchId && { ShopBranchId: filter.ShopBranchId }),
        ...(filter.CreateAtFrom && {
          CreateAtFrom: String(
            moment(filter.CreateAtFrom).format('YYYY-MM-DD HH:mm:ss')
          ),
        }),
        ...(filter.CreateAtTo && {
          CreateAtTo: String(
            moment(filter.CreateAtTo).format('YYYY-MM-DD HH:mm:ss')
          ),
        }),
      },
    });
  }

  uploadToWalletDiscountByExcel(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('excelFile', file);
    return this.http.post<any>(API.WalletDiscountByExcel, formData);
  }
}
