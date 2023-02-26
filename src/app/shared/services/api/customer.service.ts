import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import {
  Customer,
  CustomerAaddresses,
  CustomerFilter,
  CustomerLastLoginFilter,
  CustomerNoteFilter,
  List,
} from '../../models';

const API = END_POINTS.Customer;

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  get(filter: CustomerFilter): Observable<List<Customer>> {
    return this.http.get<List<Customer>>(API.search, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.CustomerId && { CustomerId: filter.CustomerId }),
        ...(filter.phoneNumber && { PhoneNumber: filter.phoneNumber }),
        ...(filter.IsActive != null && { NameAr: filter.IsActive }),
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

  getById(customerId: any): Observable<Customer> {
    return this.http.get<Customer>(API.getById(customerId));
  }

  addCustomerNote(body: any): Observable<Customer> {
    return this.http.post<Customer>(API.addCustomerNote, body);
  }

  getCustomerNote(
    customerId: any,
    filter: CustomerNoteFilter
  ): Observable<Customer> {
    return this.http.get<Customer>(API.getCustomerNote(customerId), {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.CustomerId && { CustomerId: filter.CustomerId }),
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

  getLastLoginReport(filter: CustomerLastLoginFilter): Observable<any> {
    return this.http.get<any>(API.getLastLoginReport, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.CustomerId && { CustomerId: filter.CustomerId }),
        ...(filter.LastLoginFrom && {
          LastLoginFrom: String(
            moment(filter.LastLoginFrom).format('YYYY-MM-DD HH:mm:ss')
          ),
        }),
        ...(filter.LastLoginTo && {
          LastLoginTo: String(
            moment(filter.LastLoginTo).format('YYYY-MM-DD HH:mm:ss')
          ),
        }),
      },
    });
  }

  GetCustomerAddresses(filter: CustomerAaddresses): Observable<any> {
    return this.http.get<any>(API.GetCustomerAddresses, {
      params: {
        ...(filter.ApplicationUserId && {
          ApplicationUserId: filter.ApplicationUserId,
        }),
      },
    });
  }

  GetReferrerReport(customerId: any): Observable<Customer> {
    return this.http.get<Customer>(API.GetReferrerReport(customerId));
  }
}
