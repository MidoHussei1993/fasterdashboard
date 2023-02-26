import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { Dropdown, List } from 'src/app/shared';
import { Vendor, VendorFilter } from '../models';

const API = END_POINTS.Vendor;

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  constructor(private http: HttpClient) {}

  create(model: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(API.add, model);
  }

  get(filter: VendorFilter): Observable<List<Vendor>> {
    return this.http.get<List<Vendor>>(API.search, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.FullName && { FullName: filter.FullName }),
        ...(filter.Email && { Email: filter.Email }),
        ...(filter.IsActive && { IsActive: filter.IsActive }),
      ...(filter.CreateAtFrom && {CreateAtFrom:String(moment(filter.CreateAtFrom).format('YYYY-MM-DD HH:mm:ss'))}),
      ...(filter.CreateAtTo && {CreateAtTo:String(moment(filter.CreateAtTo).format('YYYY-MM-DD HH:mm:ss'))}),
      },
    });
  }

  getByID(id: number): Observable<Vendor> {
    return this.http.get<Vendor>(API.getById(id));
  }

  update(model: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(API.update, model);
  }
  getDropdown(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.getDell);
  }
  ChangeActivation(id: string): Observable<any> {
    return this.http.post<any>(API.ChangeActivation(id), {});
  }
  uploadImage(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(API.UploadImage, formData);
  }
}
