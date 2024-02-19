import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { List } from 'echarts';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { AdditionalComponentFilter } from '../models';

const API = END_POINTS.additionalComponent;

@Injectable({
  providedIn: 'root',
})
export class AdditionalComponentService {
  constructor(private http: HttpClient) {}

  create(model: any): Observable<any> {
    return this.http.post<any>(API.add, model);
  }

  get(filter: AdditionalComponentFilter): Observable<List<any>> {
    return this.http.get<List<any>>(API.search, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.Name && { Name: filter.Name }),
        ...(filter.AdditionalComponentTitleId && {
          AdditionalComponentTitleId: filter.AdditionalComponentTitleId,
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

  getById(id: number): Observable<any> {
    return this.http.get<any>(API.getById + `${id}`);
  }

  edit(model: any): Observable<any> {
    return this.http.put<any>(API.update, model);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(API.delete(id));
  }
  ChangeActivation(id: any): Observable<any> {
    return this.http.post<any>(API.ChangeActivation,{},{
      params:{
        AdditionalComponentId:id
      }
    });
  }
}
