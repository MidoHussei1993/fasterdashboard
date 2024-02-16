  import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { Dropdown, List } from 'src/app/shared';
import { AdditionalComponentTitleFilter } from '../models';

const API = END_POINTS.AdditionalComponentTitle;

@Injectable({
  providedIn: 'root',
})
export class AdditionalComponentTitleService {
  constructor(private http: HttpClient) {}

  create(model: any): Observable<any> {
    return this.http.post<any>(API.add, model);
  }

  get(filter: AdditionalComponentTitleFilter): Observable<List<any>> {
    return this.http.get<List<any>>(API.search, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.Title && { Title: filter.Title }),
        ...(filter.ProductDetailsId && { ProductDetailsId: filter.ProductDetailsId }),
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

  edit(id:any,model: any): Observable<any> {
    return this.http.put<any>(API.update, model);
  }

  ChangeActivation(id: string): Observable<any> {
    return this.http.post<any>(API.ChangeActivation, {
      AdditionalComponentTitleId: id,
    });
  }

  GetDDL(): Observable<any> {
    return this.http.get<any>(API.GetDDL);
  }
}
