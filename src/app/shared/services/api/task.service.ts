import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';

const API = END_POINTS.Task;

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  SendOrderToTookan(orderId: string): Observable<any> {
    return this.http.get<any>(API.SendOrderToTookan(orderId));
  }
}
