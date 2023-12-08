import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { List } from 'src/app/shared';
import { MoyaserFilter } from '../models/moyaser-filter.model';

const API = END_POINTS.Moyaser;

@Injectable({
  providedIn: 'root',
})
export class MoyaserService {
  constructor(private http: HttpClient) {}

  get(filter: MoyaserFilter): Observable<List<any>> {
    return this.http.get<List<any>>(API.getAll, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.Id && { Id: filter.Id }),
        ...(filter.status && { status: filter.status }),
        ...(filter.CreatedAfter && {
          CreatedAfter: String(
            moment(filter.CreatedAfter).format('YYYY-MM-DD HH:mm:ss')
          ),
        }),
        ...(filter.CreatedBefore && {
          CreatedBefore: String(
            moment(filter.CreatedBefore).format('YYYY-MM-DD HH:mm:ss')
          ),
        }),
      },
    });
  }

  getCustomerPhone(description: string): Observable<any> {
    return this.http.get<List<any>>(API.getCustomerPhone(description));
  }
  refundPayment(body: any): Observable<any> {
    return this.http.post<any>(API.RefundPayment, body);
  }
}
