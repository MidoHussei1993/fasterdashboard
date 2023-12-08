import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';

const API = END_POINTS.OrderDispatch;

@Injectable({
  providedIn: 'root',
})
export class OrderDispatchService {
  constructor(private http: HttpClient) {}

  getDeliveryProviders(): Observable<any> {
    // return this.http.get<any>(API.GetDeliveryProviders);
    return this.http.get<any>(
      'https://api.faster.sa:7090/api/OrderDispatch/GetDeliveryProviders',
      {
        headers: {
          Authorization: '',
          Accept: 'application/json, text/plain, */*',
          Connection: 'keep-alive',
          // 'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*',
          'Accept-Encoding': 'gzip, deflate, br',
        },
      }
    );
  }
}
