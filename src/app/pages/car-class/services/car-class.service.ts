import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { Dropdown, List } from 'src/app/shared';
import { CarClass, CarClassFilter } from '../models';

const API = END_POINTS.CarClass;

@Injectable({
  providedIn: 'root'
})
export class CarClassService {
  constructor(private http: HttpClient) {}

  create(model: CarClass): Observable<CarClass> {
    return this.http.post<CarClass>(API.add, model);
  }

  get(filter: CarClassFilter): Observable<List<CarClass>> {
    return this.http.get<List<CarClass>>(API.search, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.Name && { Name: filter.Name }),
        ...(filter.CreateAtFrom && {
          CreateAtFrom: String(moment(filter.CreateAtFrom).format('YYYY-MM-DD HH:mm:ss')),
        }),
        ...(filter.CreateAtTo && { CreateAtTo: String(moment(filter.CreateAtTo).format('YYYY-MM-DD HH:mm:ss')) }),
      },
    });
  }

  getByID(id: number): Observable<CarClass> {
    return this.http.get<CarClass>(API.getById(id));
  }

  update(model: CarClass): Observable<CarClass> {
    return this.http.put<CarClass>(API.update, model);
  }
  getDropdown(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.getDell);
  }
  UploadImage(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(API.uploadImage, formData);
  }
  ChangeActivation(id: string): Observable<any> {
    return this.http.post<any>(API.ChangeActivation(id),{});
  }
}
