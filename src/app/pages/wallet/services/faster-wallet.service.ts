import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { List } from 'src/app/shared';
import { FasterWalletFilter } from '../models/faster-wallet.filter';

const API = END_POINTS.fasterWallet;

@Injectable({
  providedIn: 'root'
})
export class FasterWalletService {
  constructor(private http: HttpClient) {}


  create(model: any): Observable<any> {
    return this.http.post<any>(API.add, model);
  }

  get(filter: FasterWalletFilter): Observable<List<any>> {
    return this.http.get<List<any>>(API.search, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.Type && { Type: filter.Type }),
         ...(filter.CreateAtFrom && {CreateAtFrom: String(moment(filter.CreateAtFrom).format('YYYY-MM-DD HH:mm:ss'))}),
         ...(filter.CreateAtTo && {CreateAtTo: String(moment(filter.CreateAtTo).format('YYYY-MM-DD HH:mm:ss'))}),
      },
    });
  }

  GetFasterWalletSum(): Observable<any> {
    return this.http.get<any>(API.GetFasterWalletSum);
  }

}
