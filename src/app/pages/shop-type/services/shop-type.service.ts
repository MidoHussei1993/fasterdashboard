import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { List, Dropdown } from 'src/app/shared';
import { ShopType, ShopTypeFilter } from '../models';

const API = END_POINTS.ShopType;


@Injectable({
  providedIn: 'root'
})
export class ShopTypeService {

  constructor(private http: HttpClient) {}

  create(model: ShopType): Observable<ShopType> {
    return this.http.post<ShopType>(API.add, model);
  }

  get(filter:ShopTypeFilter): Observable<List<ShopType>> {
    return this.http.get<List<ShopType>>(API.search, { params: { 
      ...(filter.PageSize && {PageSize: filter.PageSize}),
      ...(filter.PageNumber && {PageNumber: filter.PageNumber}),
      ...(filter.Name && {Name: filter.Name}),
      ...(filter.NameAr && {NameAr: filter.NameAr}),
      ...(filter.CreateAtFrom && {CreateAtFrom:String(moment(filter.CreateAtFrom).format('YYYY-MM-DD HH:mm:ss'))}),
      ...(filter.CreateAtTo && {CreateAtTo:String(moment(filter.CreateAtTo).format('YYYY-MM-DD HH:mm:ss'))}),
       } });
  }

  getByID(id: number): Observable<ShopType> {
    return this.http.get<ShopType>(API.getById + `${id}`);
  }

  update( model: ShopType): Observable<ShopType> {
    return this.http.put<ShopType>(API.update, model);
  }

  delete(id: number): Observable<ShopType> {
    return this.http.delete<ShopType>(API.delete + `${id}`);
  }

  getDropdown(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.getDell);
  }
  UploadImage(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(API.UploadImage, formData);
  }
  ChangeActivation(id: string): Observable<any> {
    return this.http.post<any>(API.ChangeActivation(id),{});
  }
}
