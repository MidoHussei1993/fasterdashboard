import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { List } from 'src/app/shared';

const API = END_POINTS.FixedShopAmounts;

@Injectable({
  providedIn: 'root',
})
export class FixedShopAmountService {
  constructor(private http: HttpClient) {}

  create(model: any): Observable<any> {
    return this.http.post<any>(API.add, model);
  }

  get(shopId: any): Observable<List<any>> {
    return this.http.get<List<any>>(API.search(shopId));
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(API.getById(id));
  }

  edit(id: any, model: any): Observable<any> {
    return this.http.put<any>(API.update, model);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(API.delete(id));
  }
}
