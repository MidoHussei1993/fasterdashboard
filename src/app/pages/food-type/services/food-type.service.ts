import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { Dropdown, List } from 'src/app/shared';
import { FoodTypeFilter } from '../models/food-type-filter';

const API = END_POINTS.foodType;

@Injectable({
  providedIn: 'root'
})
export class FoodTypeService {

  constructor(private http: HttpClient) {}

  create(model: any): Observable<any> {
    return this.http.post<any>(API.add, model);
  }

  get(filter:FoodTypeFilter): Observable<List<any>> {
    return this.http.get<List<any>>(API.search, { params: { 
      ...(filter.PageSize && {PageSize: filter.PageSize}),
      ...(filter.PageNumber && {PageNumber: filter.PageNumber}),
      ...(filter.Name && {Name: filter.Name}),
      ...(filter.IsActive && {IsActive: filter.IsActive}),
       } });
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(API.getById + id);
  }

  edit(id:any,model: any): Observable<any> {
    return this.http.put<any>(API.update , model);
  }

  getDropdown(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.getDell);
  }
  uploadImage(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(API.UploadImage, formData);
  }

  ChangeActivation(id: string): Observable<any> {
    return this.http.post<any>(API.ChangeActivation(id),{});
  }
 

}
