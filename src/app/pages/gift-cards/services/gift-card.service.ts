import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import * as moment from 'moment';
import { List, Dropdown } from 'src/app/shared';
import { Observable } from 'rxjs';
import { GiftCardFilter } from '../models/gift-card-filter.model';

const API = END_POINTS.GiftCard;

@Injectable({
  providedIn: 'root',
})
export class GiftCardService {
  constructor(private http: HttpClient) {}

  create(model: any): Observable<any> {
    return this.http.post<any>(API.add, model);
  }

  get(filter: GiftCardFilter): Observable<List<any>> {
    return this.http.get<List<any>>(API.search, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.Title && { Title: filter.Title }),
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

  getDropdown(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.getDell);
  }
  GetGiftCardTypesSendSearch(filter: GiftCardFilter): Observable<any[]> {
    return this.http.get<any[]>(API.GetGiftCardTypesSendSearch, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.Title && { Title: filter.Title }),
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
  ChangeActivation(id: string): Observable<any> {
    return this.http.post<any>(API.ChangeActivation(id), {});
  }
  UploadImage(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(API.UploadImage, formData);
  }
}
