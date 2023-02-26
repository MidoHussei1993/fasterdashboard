import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { Dropdown, List } from 'src/app/shared';
import { Subscription, SubscriptionFilter } from '../models';

const API = END_POINTS.Subscription;

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(private http: HttpClient) {}

  create(model: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(API.add, model);
  }

  get(filter: SubscriptionFilter): Observable<List<Subscription>> {
    return this.http.get<List<Subscription>>(API.search, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.SubscriptionName && {
          SubscriptionName: filter.SubscriptionName,
        }),
        ...(filter.SubscriptionNameAr && {
          SubscriptionNameAr: filter.SubscriptionNameAr,
        }),
        ...(filter.IsActive && { IsActive: filter.IsActive }),
      ...(filter.CreateAtFrom && {CreateAtFrom:String(moment(filter.CreateAtFrom).format('YYYY-MM-DD HH:mm:ss'))}),
      ...(filter.CreateAtTo && {CreateAtTo:String(moment(filter.CreateAtTo).format('YYYY-MM-DD HH:mm:ss'))}),
      },
    });
  }

  getByID(id: number): Observable<Subscription> {
    return this.http.get<Subscription>(API.getById(id));
  }
  ChangeSubscriptionActivation(body: {
    SubscriptionId: number;
    IsActive: boolean;
  }): Observable<Subscription> {
    return this.http.put<Subscription>(
      API.ChangeSubscriptionActivation,
      {},
      {
        params: {
          ...(body.SubscriptionId && { SubscriptionId: body.SubscriptionId }),
          IsActive: body.IsActive,
        },
      }
    );
  }

  getSubscriptionDDL(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.getSubscriptionDDL);
  }
}
