import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { Country } from 'src/app/pages/country/country.model';
import { CountryFilter } from 'src/app/pages/country/countryFilter.model';
import { Dropdown, List } from '../..';

const COUNTRY_API = END_POINTS.Country;


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) {}

  create(model: Country): Observable<any> {
    return this.http.post<any>(COUNTRY_API.add, model);
  }

  get(filter:CountryFilter): Observable<List<Country>> {
    return this.http.get<List<Country>>(COUNTRY_API.search, { params: { 
      ...(filter.PageSize && {PageSize: filter.PageSize}),
      ...(filter.PageNumber && {PageNumber: filter.PageNumber}),
      ...(filter.CountryName && {CountryName: filter.CountryName}),
      ...(filter.CountryNameAr && {CountryNameAr: filter.CountryNameAr}),
     ...(filter.CreateAtFrom && {CreateAtFrom:String(moment(filter.CreateAtFrom).format('YYYY-MM-DD HH:mm:ss'))}),
     ...(filter.CreateAtTo && {CreateAtTo:String(moment(filter.CreateAtTo).format('YYYY-MM-DD HH:mm:ss'))}),
       } });
  }

  getByID(id: number): Observable<Country> {
    return this.http.get<Country>(COUNTRY_API.getById + id);
  }

  update(model: Country): Observable<Country> {
    return this.http.put<Country>(COUNTRY_API.update , model);
  }

  getDropdown(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(COUNTRY_API.getDell);
  }
}
