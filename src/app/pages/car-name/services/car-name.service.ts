import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { Dropdown, List } from 'src/app/shared';
import { CarName, CarNameFilter } from '../models';

const API = END_POINTS.CarName;

@Injectable({
  providedIn: 'root',
})
export class CarNameService {
  constructor(private http: HttpClient) {}

  create(model: CarName): Observable<CarName> {
    return this.http.post<CarName>(API.add, model);
  }

  get(filter: CarNameFilter): Observable<List<CarName>> {
    return this.http.get<List<CarName>>(API.search, {
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

  getByID(id: number): Observable<CarName> {
    return this.http.get<CarName>(API.getById(id));
  }

  update(model: CarName): Observable<CarName> {
    return this.http.put<CarName>(API.update, model);
  }
  getDropdown(carClassId : number): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.getDell(carClassId));
  }
  ChangeActivation(id: string): Observable<any> {
    return this.http.post<any>(API.ChangeActivation(id),{});
  }
}
