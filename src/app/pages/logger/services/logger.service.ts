import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { List } from 'src/app/shared';
import { LoggerFilter, Logger } from '../models';

const API = END_POINTS.LoggerService;

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private http: HttpClient) {}

  get(filter: LoggerFilter): Observable<List<Logger>> {
    return this.http.get<List<Logger>>(API.search, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.CreateAtFrom && {
          CreateAtFrom: String(filter.CreateAtFrom),
        }),
        ...(filter.CreateAtTo && { CreateAtTo: String(filter.CreateAtTo) }),
      },
    });
  }

}
