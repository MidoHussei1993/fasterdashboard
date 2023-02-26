import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { Dropdown, List } from 'src/app/shared';
import { ItemSize, ItemSizeFilter } from '../models';

const API = END_POINTS.ItemSize;

@Injectable({
  providedIn: 'root'
})
export class ItemSizeService {

  constructor(private http: HttpClient) {}

  create(model: ItemSize): Observable<ItemSize> {
    return this.http.post<ItemSize>(API.add, model);
  }

  get(filter:ItemSizeFilter): Observable<List<ItemSize>> {
    return this.http.get<List<ItemSize>>(API.search, { params: { 
      ...(filter.PageSize && {PageSize: filter.PageSize}),
      ...(filter.PageNumber && {PageNumber: filter.PageNumber}),
      ...(filter.SizeName && {SizeName: filter.SizeName}),
      ...(filter.SizeNameAr && {SizeNameAr: filter.SizeNameAr}),
       ...(filter.CreateAtFrom && {CreateAtFrom: String(moment(filter.CreateAtFrom).format('YYYY-MM-DD HH:mm:ss'))}),
       ...(filter.CreateAtTo && {CreateAtTo: String(moment(filter.CreateAtTo).format('YYYY-MM-DD HH:mm:ss'))}),
       } });
  }

  getByID(id: number): Observable<ItemSize> {
    return this.http.get<ItemSize>(API.getById(id));
  }

  update(model: ItemSize): Observable<ItemSize> {
    return this.http.put<ItemSize>(API.update , model);
  }

  getDropdown(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.getDell);
  }
}