import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { CustomerOrderBounsFilter } from '../models';

const API = END_POINTS.CustomerOrderBonus;


@Injectable({
  providedIn: 'root'
})
export class CustomerOrderBounsService {

  constructor(private http: HttpClient) {}

  create(model: any): Observable<any> {
    return this.http.post<any>(API.add, model);
  }

  get(filter:CustomerOrderBounsFilter): Observable<any> {
    return this.http.get<any>(API.search, { params: { 
      ...(filter.PageSize && {PageSize: filter.PageSize}),
      ...(filter.PageNumber && {PageNumber: filter.PageNumber}),
      ...(filter.IsActive && {IsActive: filter.IsActive}),
      ...(filter.CreateAtFrom && {CreateAtFrom: String(moment(filter.CreateAtFrom).format('YYYY-MM-DD HH:mm:ss'))}),
      ...(filter.CreateAtTo && {CreateAtTo: String(moment(filter.CreateAtTo).format('YYYY-MM-DD HH:mm:ss'))}),
       } });
  }

  getByID(id: number): Observable<any> {
    return this.http.get<any>(API.getById(id));
  }

  ChangeActivation(id: string): Observable<any> {
    return this.http.post<any>(API.ChangeActivation(id), {});
  }

}
