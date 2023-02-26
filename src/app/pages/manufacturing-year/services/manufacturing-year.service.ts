import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { Dropdown, List } from 'src/app/shared';
import { ManufacturingYear, ManufacturingYearFilter } from '../models';

const API = END_POINTS.ManufacturingYear;


@Injectable({
  providedIn: 'root'
})
export class ManufacturingYearService {
  constructor(private http: HttpClient) {}

  create(model: ManufacturingYear): Observable<ManufacturingYear> {
    return this.http.post<ManufacturingYear>(API.add, model);
  }

  get(filter: ManufacturingYearFilter): Observable<List<ManufacturingYear>> {
    return this.http.get<List<ManufacturingYear>>(API.search, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.Year && { Year: filter.Year }),
        ...(filter.CreateAtFrom && {CreateAtFrom: String(moment(filter.CreateAtFrom).format('YYYY-MM-DD HH:mm:ss'))}),
        ...(filter.CreateAtTo && {CreateAtTo: String(moment(filter.CreateAtTo).format('YYYY-MM-DD HH:mm:ss'))}),
      },
    });
  }

  getByID(id: number): Observable<ManufacturingYear> {
    return this.http.get<ManufacturingYear>(API.getById(id));
  }

  update(model: ManufacturingYear): Observable<ManufacturingYear> {
    return this.http.put<ManufacturingYear>(API.update, model);
  }
  getDropdown(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.getDell);
  }
  ChangeActivation(id: string): Observable<any> {
    return this.http.post<any>(API.ChangeActivation(id),{});
  }
}
