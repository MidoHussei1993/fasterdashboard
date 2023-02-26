import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { List } from 'src/app/shared';
import { ShopBranchWorkTime } from '../models';

const API = END_POINTS.ShopBranchWorkTime;

@Injectable({
  providedIn: 'root'
})
export class ShopBranchWorkTimeService {

 
  constructor(private http: HttpClient) {}

  create(model: ShopBranchWorkTime): Observable<ShopBranchWorkTime> {
    return this.http.post<ShopBranchWorkTime>(API.add, model);
  }

  get(shopBranchId:number): Observable<ShopBranchWorkTime[]> {
    return this.http.get<ShopBranchWorkTime[]>(API.search + shopBranchId);
  }

  getByID(id: number): Observable<ShopBranchWorkTime> {
    return this.http.get<ShopBranchWorkTime>(API.getById + id);
  }

  update(model: ShopBranchWorkTime): Observable<ShopBranchWorkTime> {
    return this.http.put<ShopBranchWorkTime>(API.update , model);
  }

  delete(id: number): Observable<ShopBranchWorkTime> {
    return this.http.delete<ShopBranchWorkTime>(API.delete + `${id}`);
  }

}
