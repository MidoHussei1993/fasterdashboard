import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { Dropdown, List } from 'src/app/shared/models';
import { AdditionOption, AditionOptionFilter } from '../models';

const Addition_API = END_POINTS.Addition;



@Injectable({
  providedIn: 'root',
})
export class AdditionOptionService {
  constructor(private http: HttpClient) {}

  create(model: AdditionOption): Observable<any> {
    model.id = 0;
    model.createAt = new Date();
    return this.http.post<any>(Addition_API.add, model);
  }

  get(filter:AditionOptionFilter): Observable<List<AdditionOption>> {
    return this.http.get<List<AdditionOption>>(Addition_API.search, { params: {
      ...(filter.PageSize && {PageSize: filter.PageSize}),
      ...(filter.PageNumber && {PageNumber: filter.PageNumber}),
      ...(filter.CreateAtFrom && {CreateAtFrom: String(filter.CreateAtFrom)}),
      ...(filter.CreateAtTo && {CreateAtTo: String(filter.CreateAtTo)}),
      ...(filter.Name && {Name: filter.Name}),
      ...(filter.NameAr && {NameAr: filter.NameAr}),
       } });
  }

  getByID(id: number): Observable<AdditionOption> {
    return this.http.get<AdditionOption>(Addition_API.getById+`${id}`);
  }

  update( model: any): Observable<AdditionOption> {
    return this.http.put<AdditionOption>(Addition_API.update , model);
  }

  Deleted(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(Addition_API.getDell);
  }
}
