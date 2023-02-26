import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { List } from 'src/app/shared';
import { ApproveWalletFilter } from '../../approve-wallet/models';
import { ProviderWallet, ProviderWalletFilter } from '../models';

const API = END_POINTS.ProviderWallet;

@Injectable({
  providedIn: 'root',
})
export class ProviderWalletService {
  constructor(private http: HttpClient) {}

  GetProviderWalletSum(id: number): Observable<any> {
    return this.http.get<any>(API.GetProviderWalletSum(id));
  }

  getProviderWallet(
    filter: ProviderWalletFilter
  ): Observable<List<ProviderWallet>> {
    return this.http.get<List<ProviderWallet>>(
      API.GetProviderWallet(filter.ProviderId),
      {
        params: {
          ...(filter.PageSize && { PageSize: filter.PageSize }),
          ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
          ...(filter.ProviderId && { ProviderId: filter.ProviderId }),
          ...(filter.Type && { ShopId: filter.Type }),
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
      }
    );
  }

  create(body: ProviderWallet): Observable<ProviderWallet> {
    return this.http.post<ProviderWallet>(API.add, body);
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
  uploadToWalletDiscountByExcel(file: any, imagePath): Observable<any> {
    const formData = new FormData();
    formData.append('excelFile', file);
    return this.http.post<any>(API.WalletDiscountByExcel, formData, {
      headers: {
        imagePath: imagePath,
      },
    });
  }

  getWalletNotesDDL(): Observable<any> {
    return this.http.get<any>(API.GetWalletNotesDDL);
  }
}
