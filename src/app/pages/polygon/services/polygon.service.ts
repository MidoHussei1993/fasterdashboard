import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { Dropdown } from 'src/app/shared';
import { PolygonFilter } from '../models';

const API = END_POINTS.Polygon;

@Injectable({
  providedIn: 'root',
})
export class PolygonService {
  constructor(private http: HttpClient) {}

  get(filter: PolygonFilter): Observable<any[]> {
    return this.http.get<any[]>(API.search, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.orderType && { orderType: filter.orderType }),
        ...(filter.polygonType && { polygonType: filter.polygonType }),
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
    return this.http.get<any>(API.getById(id));
  }

  create(body: any): Observable<any> {
    return this.http.post<any>(API.add, body);
  }

  // edit(id:number,body:any): Observable<any> {
  //   return this.http.patch<any>(API.update(id),body)
  // }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(API.delete(id));
  }
  getDropdown(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.getDell);
  }
  GetOrderTypeDDL(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.GetOrderTypeDDL);
  }

  ChangeActivation(id: string): Observable<any> {
    return this.http.post<any>(API.ChangeActivation(id), {});
  }
}
