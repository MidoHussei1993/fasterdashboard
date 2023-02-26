import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { List } from 'src/app/shared';

const API = END_POINTS.TransportOrderNotification;

@Injectable({
  providedIn: 'root'
})
export class TransportOrderNotificationService {

  constructor(private http: HttpClient) {}

  create(model): Observable<any> {
    return this.http.post<any>(API.add, model);
  }

  get(): Observable<List<any>> {
    return this.http.get<List<any>>(API.search);
  }

  getByID(id: number): Observable<any> {
    return this.http.get<any>(API.getById(id));
  }

  update( model: any): Observable<any> {
    return this.http.put<any>(API.update, model);
  }

}
