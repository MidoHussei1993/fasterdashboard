import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { Dropdown, List } from 'src/app/shared/models';
import { Shop, ShopBranchOrderReportFilter, ShopFilter } from '../models';

const API = END_POINTS.Shop;

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private http: HttpClient) {}

  create(model: Shop): Observable<any> {
    return this.http.post<any>(API.add, model);
  }

  get(filter: ShopFilter): Observable<List<Shop>> {
    return this.http.get<List<Shop>>(API.search, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.ShopTypeId && { ShopTypeId: filter.ShopTypeId }),
        ...(filter.ApplicationUserId && {
          ApplicationUserId: filter.ApplicationUserId,
        }),
        ...(filter.ShopName && { ShopName: filter.ShopName }),
        ...(filter.ShopNameAr && { ShopName: filter.ShopNameAr }),
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

  getByID(id: number): Observable<Shop> {
    return this.http.get<Shop>(API.getById + id);
  }

  getFoodTypesByShopId(id: number): Observable<Shop> {
    return this.http.get<Shop>(API.GetFoodTypesByShopId(id));
  }

  update(model: Shop): Observable<Shop> {
    return this.http.put<Shop>(API.update, model);
  }

  getDropdown(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.getDell);
  }
  uploadImage(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(API.UploadImage, formData);
  }
  AddByExcel(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('excelFile', file);
    return this.http.post<any>(API.AddByExcel, formData);
  }

  DownloadExcelSample(): Observable<any> {
    return this.http.get<any>(API.DownloadExcelSample);
  }

  changePartnerStatus(shopId: number): Observable<any> {
    return this.http.post<any>(API.changePartnerStatus(shopId), {});
  }

  getShopBranchsOrderReport(
    filter: ShopBranchOrderReportFilter
  ): Observable<List<Shop>> {
    return this.http.get<List<Shop>>(API.getShopBranchsOrderReport, {
      params: {
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

  ChangeAllShopBranchesActivation(
    shopId: number,
    status: boolean
  ): Observable<any> {
    return this.http.post<any>(
      API.ChangeAllShopBranchesActivation(shopId, status),
      {}
    );
  }

  GetDispatchTypeDDL(): Observable<any> {
    return this.http.get<any>(API.GetDispatchTypeDDL);
  }

  ChangeDispatchType(type: number): Observable<any> {
    return this.http.post<any>(API.ChangeDispatchType(type), {});
  }
}
