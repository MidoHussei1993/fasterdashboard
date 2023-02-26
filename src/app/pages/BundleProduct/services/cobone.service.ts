import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { Deleted, List } from 'src/app/shared/models';
import { Cobone, CoboneFilter } from '../models';

const Cobone_API = END_POINTS.Cobone;



@Injectable({
  providedIn: 'root',
})
export class CoboneService {
  constructor(private http: HttpClient) {}

  create(model: Cobone): Observable<any> {
    return this.http.post<any>(Cobone_API.add, model);
  }

  get(filter:CoboneFilter): Observable<List<Cobone>> {
    return this.http.get<List<Cobone>>(Cobone_API.search, { params: {
      ...(filter.PageSize && {PageSize: filter.PageSize}),
      ...(filter.PageNumber && {PageNumber: filter.PageNumber}),
      ...(filter.ShopId && {ShopId: filter.ShopId}),
      ...(filter.ExpiryDateFrom && {ExpiryDateFrom: String(moment(filter.ExpiryDateFrom).format('YYYY-MM-DD HH:mm:ss'))}),
      ...(filter.CreateAtFrom && {CreateAtFrom: String(moment(filter.CreateAtFrom).format('YYYY-MM-DD HH:mm:ss'))}),
      ...(filter.CreateAtTo && {CreateAtTo: String(moment(filter.CreateAtTo).format('YYYY-MM-DD HH:mm:ss'))}),
      ...(filter.CoboneCode && {CoboneCode: filter.CoboneCode}),
       } });
  }

  getByID(id: number): Observable<Cobone> {
    return this.http.get<Cobone>(Cobone_API.getById + `${id}`);
  }

  update(id: number, model: any): Observable<Cobone> {
    return this.http.put<Cobone>(Cobone_API.update + `/${id}`, model);
  }

  Deleted(): Observable<Deleted[]> {
    return this.http.get<Deleted[]>(Cobone_API.getDell);
  }
}
