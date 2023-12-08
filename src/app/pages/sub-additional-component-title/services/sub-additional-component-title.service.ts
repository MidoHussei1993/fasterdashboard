import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import {
  SubAdditionalComponentTitle,
  SubAdditionalComponentTitleFilter,
} from '../models';
import { Dropdown, List } from 'src/app/shared';

const API = END_POINTS.SubAdditionalComponentTitle;

@Injectable({
  providedIn: 'root',
})
export class SubAdditionalComponentTitleService {
  constructor(private http: HttpClient) {}

  create(
    model: SubAdditionalComponentTitle
  ): Observable<SubAdditionalComponentTitle> {
    return this.http.post<SubAdditionalComponentTitle>(API.add, model);
  }

  get(
    filter: SubAdditionalComponentTitleFilter
  ): Observable<List<SubAdditionalComponentTitle>> {
    return this.http.get<List<SubAdditionalComponentTitle>>(API.search, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.Name && { Name: filter.Name }),
        ...(filter.AdditionalComponentId && {
          AdditionalComponentId: filter.AdditionalComponentId,
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
      },
    });
  }

  getById(id: number): Observable<SubAdditionalComponentTitle> {
    return this.http.get<SubAdditionalComponentTitle>(API.getById(id));
  }

  update(
    model: SubAdditionalComponentTitle
  ): Observable<SubAdditionalComponentTitle> {
    return this.http.put<SubAdditionalComponentTitle>(API.update, model);
  }

  getDropdown(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.getDropdown);
  }
}
