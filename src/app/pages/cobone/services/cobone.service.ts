import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { Dropdown, List } from 'src/app/shared/models';
import { Cobone, CoboneFilter } from '../models';
import { CoboneActivaye } from '../models/coboneActivate.model';
import { ShopListDDL } from '../models/Shop.model';

const API = END_POINTS.Cobone;

const Shop_API = END_POINTS.Shop;

@Injectable({
  providedIn: 'root',
})
export class CoboneService {
  constructor(private http: HttpClient) {}

  create(model: Cobone): Observable<any> {
    return this.http.post<any>(API.add, model);
  }

  get(filter: CoboneFilter): Observable<List<Cobone>> {
    return this.http.get<List<Cobone>>(API.search, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.IsActive && { IsActive: filter.IsActive }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.ShopId && { ShopId: filter.ShopId }),
        ...(filter.ExpiryDateFrom && {
          ExpiryDateFrom: String(
            moment(filter.ExpiryDateFrom).format('YYYY-MM-DD HH:mm:ss')
          ),
        }),
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
        ...(filter.CoboneCode && { CoboneCode: filter.CoboneCode }),
      },
    });
  }

  getByID(id: number): Observable<Cobone> {
    return this.http.get<Cobone>(API.getById + `${id}`);
  }

  update(model: any): Observable<Cobone> {
    return this.http.put<Cobone>(API.update, model);
  }

  Deleted(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.getDell);
  }

  dactivate(CoboneId: number, model: any): Observable<CoboneActivaye> {
    return this.http.post<CoboneActivaye>(API.deactive + `/${CoboneId}`, model);
  }

  getAllShop(): Observable<ShopListDDL[]> {
    return this.http.get<ShopListDDL[]>(Shop_API.getDell);
  }

  GetCoboneTypeDDL(): Observable<ShopListDDL[]> {
    return this.http.get<ShopListDDL[]>(API.GetCoboneTypeDDL);
  }

  ChangeActivation(id: string): Observable<any> {
    return this.http.post<any>(API.ChangeActivation(id),{});
  }
}
