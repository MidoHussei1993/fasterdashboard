import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { Dropdown, List } from 'src/app/shared';
import { CarModel, CarModelFilter } from '../models';

const API = END_POINTS.CarModel;

@Injectable({
  providedIn: 'root'
})
export class CarModelService {
  constructor(private http: HttpClient) {}

  create(model: CarModel): Observable<CarModel> {
    return this.http.post<CarModel>(API.add, model);
  }

  get(filter: CarModelFilter): Observable<List<CarModel>> {
    return this.http.get<List<CarModel>>(API.search, {
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

  getByID(id: number): Observable<CarModel> {
    return this.http.get<CarModel>(API.getById(id));
  }

  update(model: CarModel): Observable<CarModel> {
    return this.http.put<CarModel>(API.update, model);
  }
  getDropdown(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.getDell);
  }
  ChangeActivation(id: string): Observable<any> {
    return this.http.post<any>(API.ChangeActivation(id),{});
  }
}
