import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { AllCity } from 'src/app/pages/city/city-list/Cities.model';
import { City, CityAdd, CityFilter, Dropdown, List } from '../..';

const CITY_API = END_POINTS.City;


@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) {}

  create(model: CityAdd): Observable<any> {
    return this.http.post<any>(CITY_API.add, model);
  }

  get(filter:CityFilter): Observable<List<City>> {
    return this.http.get<List<City>>(CITY_API.search, { params: {
      ...(filter.PageSize && {PageSize: filter.PageSize}),
      ...(filter.PageNumber && {PageNumber: filter.PageNumber}),
      ...(filter.CityName && {CityName: filter.CityName}),
      ...(filter.CityNameAr && {CityNameAr: filter.CityNameAr}),
      ...(filter.CountryId && {CountryId: filter.CountryId}),
     ...(filter.CreateAtFrom && {CreateAtFrom:String(moment(filter.CreateAtFrom).format('YYYY-MM-DD HH:mm:ss'))}),
     ...(filter.CreateAtTo && {CreateAtTo:String(moment(filter.CreateAtTo).format('YYYY-MM-DD HH:mm:ss'))}),
       } });
  }

  getByID(id: number): Observable<AllCity> {
    return this.http.get<AllCity>(CITY_API.getById + id);
  }

  update(model: CityAdd): Observable<CityAdd> {
    return this.http.put<CityAdd>(CITY_API.update , model);
  }

  getDropdown(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(CITY_API.getDell);
  }
}
