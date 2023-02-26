import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { List } from 'src/app/shared';
import { ProviderSubscription, ProviderSubscriptionFilter } from '../models';

const API = END_POINTS.ProviderSubscriptions;

@Injectable({
  providedIn: 'root'
})
export class ProviderSubscriptionService {
  constructor(private http: HttpClient) {}

  create(model: any): Observable<ProviderSubscription> {
    return this.http.post<ProviderSubscription>(API.add, model);
  }

  get(filter: ProviderSubscriptionFilter): Observable<List<ProviderSubscription>> {
    return this.http.get<List<ProviderSubscription>>(API.search, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.SubscriptionName && { SubscriptionName: filter.SubscriptionName }),
        ...(filter.CreateAtFrom && {CreateAtFrom:String(moment(filter.CreateAtFrom).format('YYYY-MM-DD HH:mm:ss'))}),
        ...(filter.CreateAtTo && {CreateAtTo:String(moment(filter.CreateAtTo).format('YYYY-MM-DD HH:mm:ss'))}),
      },
    });
  }

  RemainingDays(id: number): Observable<any> {
    return this.http.get<any>(API.RemainingDays(id));
  }
  getDriversSubscription(id: number): Observable<any> {
    return this.http.get<any>(API.getDriversSubscription(id));
  }

  GetProviderByPhoneNumber(PhoneNumber: string): Observable<any> {
    return this.http.get<any>(API.GetProviderByPhoneNumber(PhoneNumber));
  }
  addVendorDriversSubscription(body: any): Observable<any> {
    return this.http.post<any>(API.VendorDriversSubscription,body);
  }

  RenewDriversSubscriptionExpired(body: any): Observable<any> {
    return this.http.post<any>(API.RenewDriversSubscriptionExpired,body);
  }

}
