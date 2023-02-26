import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { Dropdown, List } from 'src/app/shared/models';
import { CoboneActivaye } from '../../cobone/models/coboneActivate.model';
import { Category, CategoryAdd, CategoryFilter } from '../models';


const Category_API = END_POINTS.category;



@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  create(model: Category): Observable<any> {
    return this.http.post<any>(Category_API.add, model);
  }

  get(filter:CategoryFilter): Observable<List<Category>> {
    return this.http.get<List<Category>>(Category_API.search, { params: {
      ...(filter.PageNumber && {PageNumber: filter.PageNumber}),

      ...(filter.PageSize && {PageSize: filter.PageSize}),
      ...(filter.IsActive && {IsActive: filter.IsActive}),
      ...(filter.CreateAtFrom && {CreateAtFrom: String(moment(filter.CreateAtFrom).format('YYYY-MM-DD HH:mm:ss'))}),
      ...(filter.CreateAtTo && {CreateAtTo: String(moment(filter.CreateAtTo).format('YYYY-MM-DD HH:mm:ss'))}),
      ...(filter.CategoryName && {CategoryName: filter.CategoryName}),
      ...(filter.CategoryNameAr && {CategoryNameAr: filter.CategoryNameAr}),

       } });
  }

  getByID(id: number): Observable<Category> {
    return this.http.get<Category>(Category_API.getById + `${id}`);
  }

  update( model: any): Observable<CategoryAdd> {
    return this.http.put<CategoryAdd>(Category_API.update , model);
  }

  getDropdown(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(Category_API.getDell);
  }

  dactivate( categoryId:number , model:any): Observable<CoboneActivaye> {
    return this.http.post<CoboneActivaye>(Category_API.deactive+`/${categoryId}`, model);
  }

  UploadImage(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(Category_API.uploadImage, formData);
  }

}
