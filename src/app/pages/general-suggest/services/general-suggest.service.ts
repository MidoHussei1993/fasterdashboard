import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { List } from 'src/app/shared';
import { GeneralSuggest, GeneralSuggestAdd, GeneralSuggestFilter } from '../models';

const API = END_POINTS.GeneralSuggest;


@Injectable({
  providedIn: 'root'
})
export class GeneralSuggestService {
  constructor(private http: HttpClient) {}

  create(model: GeneralSuggestAdd): Observable<GeneralSuggestAdd> {
    return this.http.post<GeneralSuggestAdd>(API.add, model);
  }

  get(filter:GeneralSuggestFilter): Observable<List<GeneralSuggest>> {
    return this.http.get<List<GeneralSuggest>>(API.search, { params: { 
      ...(filter.PageSize && {PageSize: filter.PageSize}),
      ...(filter.PageNumber && {PageNumber: filter.PageNumber}),
      ...(filter.UserTypeName && {UserTypeName: filter.UserTypeName}),
      ...(filter.Title && {Title: filter.Title}),
      ...(filter.Status && {Status: filter.Status}),
       ...(filter.CreateAtFrom && {CreateAtFrom: String(moment(filter.CreateAtFrom).format('YYYY-MM-DD HH:mm:ss'))}),
       ...(filter.CreateAtTo && {CreateAtTo: String(moment(filter.CreateAtTo).format('YYYY-MM-DD HH:mm:ss'))}),
       } });
  }

  getByID(id: number): Observable<GeneralSuggest> {
    return this.http.get<GeneralSuggest>(API.getById + id);
  }

  update(model: GeneralSuggestAdd): Observable<GeneralSuggestAdd> {
    return this.http.post<GeneralSuggestAdd>(API.update , model);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(API.delete +  id);
  }

  finish(id: any): Observable<boolean> {
    return this.http.post<boolean>(API.finish(id),{});
  }

  addReply(body): Observable<boolean> {
    return this.http.post<boolean>(API.addReply,body);
  }
}