import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';

const API = END_POINTS.ProductAdditionalOption;

@Injectable({
  providedIn: 'root'
})
export class ProductAdditionalOptionService {

  constructor(private http: HttpClient) {}

  create(model: any): Observable<any> {
    return this.http.post<any>(API.add, model);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(API.delete(id));
  }
  changeActivation(id: number): Observable<any> {
    return this.http.post<any>(API.changeActivation(id),{});
  }

}
