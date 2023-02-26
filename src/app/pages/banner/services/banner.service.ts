import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { List } from 'src/app/shared';
import { Banner, BannerFilter } from '../models';

const API = END_POINTS.Banner;

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  constructor(private http: HttpClient) {}

  create(model: Banner): Observable<Banner> {
    return this.http.post<Banner>(API.add, model);
  }

  get(filter: BannerFilter): Observable<List<Banner>> {
    return this.http.get<List<Banner>>(API.search, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.IsActive && { IsActive: filter.IsActive }),
        ...(filter.ShopId && { ShopId: filter.ShopId }),
        ...(filter.Description && { Description: filter.Description }),
        ...(filter.DescriptionAr && { DescriptionAr: filter.DescriptionAr }),
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

  getByID(id: number): Observable<Banner> {
    return this.http.get<Banner>(API.getById + id);
  }

  update(model: Banner): Observable<Banner> {
    return this.http.put<Banner>(API.update, model);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(API.delete + id);
  }

  UploadImage(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(API.UploadImage, formData);
  }

  ChangeBannerActivation(body: any): Observable<any> {
    const formData = new FormData();
    for (const [key, value] of Object.entries(body)) {
      formData.append(`${key}`, String(value));
    }
    return this.http.put<any>(API.ChangeBannerActivation, formData, {
      params: {
        BannerId: body.id,
      },
    });
  }
}
