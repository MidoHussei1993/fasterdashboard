import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { List } from 'src/app/shared';
import { AllCity } from '../city/city-list/Cities.model';
import { CityList } from '../city/city-list/citylist.model';
import { City } from '../city/city.model';
import { CityFilter } from '../city/cityFilter.model';
import { CountryList } from './country-list/countryList.model';
import { Country } from './country.model';
import { CountryFilter } from './countryFilter.model';

// country
const Country_API = END_POINTS.Country;

// city
const City_API = END_POINTS.City;

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  constructor(private http: HttpClient) { }


  // create new country
  create(model: Country): Observable<Country> {
    return this.http.post<Country>(Country_API.add, model);
  }

  // get country
  get(): Observable<CountryList[]> {
    return this.http.get<CountryList[]>(Country_API.getDell);
  }

  getList(filter:CountryFilter): Observable<List<Country>> {
    return this.http.get<List<Country>>(Country_API.search, { params: {
      ...(filter.PageSize && {PageSize: filter.PageSize}),
      ...(filter.PageNumber && {PageNumber: filter.PageNumber}),
       ...(filter.CreateAtFrom && {CreateAtFrom: String(moment(filter.CreateAtFrom).format('YYYY-MM-DD HH:mm:ss'))}),
       ...(filter.CreateAtTo && {CreateAtTo: String(moment(filter.CreateAtTo).format('YYYY-MM-DD HH:mm:ss'))}),
      ...(filter.CountryName && {CountryName: filter.CountryName}),
      ...(filter.CountryNameAr && {CountryNameAr: filter.CountryNameAr}),
       } });
  }


  // get by id
  getByID(id:number){
    return this.http.get<Country>(Country_API.getById +`${id}`);
  }

    // update
    update( model: Country): Observable<Country> {
      return this.http.put<Country>(Country_API.update, model);
    }


  getAllCity(filter:CityFilter): Observable<List<AllCity>> {
    return this.http.get<List<AllCity>>(City_API.search, { params: {
      ...(filter.PageSize && {PageSize: filter.PageSize}),
      ...(filter.PageNumber && {PageNumber: filter.PageNumber}),
       ...(filter.CreateAtFrom && {CreateAtFrom: String(moment(filter.CreateAtFrom).format('YYYY-MM-DD HH:mm:ss'))}),
       ...(filter.CreateAtTo && {CreateAtTo: String(moment(filter.CreateAtTo).format('YYYY-MM-DD HH:mm:ss'))}),
      ...(filter.CityName && {CityName: filter.CityName}),
      ...(filter.CityNameAr && {CityNameAr: filter.CityNameAr}),
       } });
  }


}
