import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { List } from 'src/app/shared';
import { Shop } from '../../shop/models';
import { ShopBranch, ShopBranchAdd, ShopBranchFilter } from '../models';

const API = END_POINTS.shopBranch;
const GoogleIntegration_API = END_POINTS.GoogleIntegration;

@Injectable({
  providedIn: 'root',
})
export class ShopBranchService {
  constructor(private http: HttpClient) {}

  create(model: ShopBranchAdd): Observable<any> {
    return this.http.post<any>(API.add, model);
  }

  get(filter: ShopBranchFilter): Observable<List<ShopBranch>> {
    return this.http.get<List<ShopBranch>>(API.search, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.IsActive && { IsActive: filter.IsActive }),
        ...(filter.ApplicationUserId && {
          ApplicationUserId: filter.ApplicationUserId,
        }),
        ...(filter.CityId && { CityId: filter.CityId }),
        ...(filter.ShopId && { ShopId: filter.ShopId }),
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

  getByID(id: number): Observable<ShopBranchAdd> {
    return this.http.get<ShopBranchAdd>(API.getById + id);
  }

  update(model: Shop): Observable<Shop> {
    return this.http.put<Shop>(API.update, model);
  }
  ChangeActivation(id: string): Observable<any> {
    return this.http.post<any>(API.ChangeActivation(id), {});
  }

  getBranchesByGoogle(shopName: string): Observable<any> {
    return this.http.get<any>(GoogleIntegration_API.branches, {
      params: {
        ...(shopName && { shopName: shopName }),
      },
    });
  }
  AddByExcel(id: any, file: any): Observable<any> {
    const formData = new FormData();
    formData.append('excelFile', file);
    return this.http.post<any>(API.AddByExcel(id), formData);
  }
}
