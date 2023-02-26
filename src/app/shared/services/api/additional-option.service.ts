import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { AdditionalOption, AdditionalOptionFilter, Dropdown, List } from '../..';

const API = END_POINTS.AdditionalOption;

@Injectable({
  providedIn: 'root'
})
export class AdditionalOptionService {

  constructor(private http: HttpClient) {}

  create(model: AdditionalOption): Observable<AdditionalOption> {
    return this.http.post<AdditionalOption>(API.add, model);
  }

  get(filter:AdditionalOptionFilter): Observable<List<AdditionalOption>> {
    return this.http.get<List<AdditionalOption>>(API.search, { params: { 
      ...(filter.PageSize && {PageSize: filter.PageSize}),
      ...(filter.PageNumber && {PageNumber: filter.PageNumber}),
      ...(filter.Name && {Name: filter.Name}),
      ...(filter.NameAr && {NameAr: filter.NameAr}),
     ...(filter.CreateAtFrom && {CreateAtFrom:String(moment(filter.CreateAtFrom).format('YYYY-MM-DD HH:mm:ss'))}),
     ...(filter.CreateAtTo && {CreateAtTo:String(moment(filter.CreateAtTo).format('YYYY-MM-DD HH:mm:ss'))}),
       } });
  }

  getByID(id: number): Observable<AdditionalOption> {
    return this.http.get<AdditionalOption>(API.getById(id));
  }

  update(model: AdditionalOption): Observable<AdditionalOption> {
    return this.http.put<AdditionalOption>(API.update , model);
  }

  getDropdown(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.getDell);
  }
}