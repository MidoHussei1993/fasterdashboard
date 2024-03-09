import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';

const API = END_POINTS.ApplicationWorkTime;

@Injectable({
  providedIn: 'root',
})
export class ApplicationWorkTimeService {
  constructor(private http: HttpClient) {}
  get(): Observable<any> {
    return this.http.get<any>(API.get);
  }
  update(model: any): Observable<any> {
    return this.http.put<any>(API.Update, model);
  }
}
