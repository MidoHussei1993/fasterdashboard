import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { Dropdown, List } from 'src/app/shared';
import { SubAdditionalComponent, SubAdditionalComponentFilter } from '../models';

const API = END_POINTS.SubAdditionalComponent;

@Injectable({
  providedIn: 'root'
})
export class SubAdditionalComponentService {

  constructor(private http: HttpClient) {}

  create(
    model: SubAdditionalComponent
  ): Observable<SubAdditionalComponent> {
    return this.http.post<SubAdditionalComponent>(API.add, model);
  }

  get(
    filter: SubAdditionalComponentFilter
  ): Observable<List<SubAdditionalComponent>> {
    return this.http.get<List<SubAdditionalComponent>>(API.search, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.Name && { Name: filter.Name }),
        ...(filter.SubAdditionalComponentTitleId && {
          SubAdditionalComponentTitleId: filter.SubAdditionalComponentTitleId,
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

  getById(id: number): Observable<SubAdditionalComponent> {
    return this.http.get<SubAdditionalComponent>(API.getById(id));
  }

  update(
    model: SubAdditionalComponent
  ): Observable<SubAdditionalComponent> {
    return this.http.put<SubAdditionalComponent>(API.update, model);
  }

  getDropdown(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.getDropdown);
  }
}
