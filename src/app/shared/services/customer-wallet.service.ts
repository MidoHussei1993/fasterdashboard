import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { ApproveWalletFilter } from 'src/app/pages/approve-wallet/models';
import {
  CustomerWallet,
  CustomerWalletFilter,
  List,
  RefundRequestSearchFilter,
} from '../models';

const API = END_POINTS.CustomerWallet;

@Injectable({
  providedIn: 'root',
})
export class CustomerWalletService {
  constructor(private http: HttpClient) {}

  get(
    customerId: number,
    filter: CustomerWalletFilter
  ): Observable<List<CustomerWallet>> {
    return this.http.get<List<CustomerWallet>>(API.get(customerId), {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.CustomerId && { CustomerId: filter.CustomerId }),
        ...(filter.Type && { Type: filter.Type }),
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

  add(body: any): Observable<any> {
    return this.http.post<any>(API.add, body);
  }

  GetCustomerWalletSum(id: number): Observable<any> {
    return this.http.get<any>(API.GetCustomerWalletSum(id));
  }

  GetWalletsAddjestmentsNotApproved(
    filter: ApproveWalletFilter
  ): Observable<any> {
    return this.http.get<any>(API.WalletsAddjestmentsNotApproved, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.Type && { Type: filter.Type }),
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
  getRefundRequestSearch(filter: RefundRequestSearchFilter): Observable<any> {
    return this.http.get<any>(API.RefundRequestSearch, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.Type && { Type: filter.Type }),
        ...(filter.Note && { Note: filter.Note }),
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

  approve(id: number): Observable<any> {
    return this.http.post<any>(API.approve(id), {});
  }

  notApprove(id: number): Observable<any> {
    return this.http.delete<any>(API.notApprove(id));
  }

  UploadImage(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(API.uploadTransferImage, formData);
  }
  RejectRefund(walletId: number): Observable<any> {
    return this.http.post<any>(API.RejectRefund(walletId), {});
  }
  RefundAmountRequest(walletId: number): Observable<any> {
    return this.http.post<any>(API.RefundAmountRequest(walletId), {});
  }
  RefundAmountRequestByOrderId(orderId: number): Observable<any> {
    return this.http.post<any>(API.RefundAmountRequestByOrderId(orderId), {});
  }
}
