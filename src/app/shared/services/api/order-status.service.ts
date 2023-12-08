import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { Dropdown } from '../../models';

const API = END_POINTS.OrderStatus;
@Injectable({
  providedIn: 'root',
})
export class OrderStatusService {
  constructor(private http: HttpClient) {}

  DeliveryOrderStatusDDL(): Observable<any[]> {
    return this.http.get<any[]>(API.DeliveryOrderStatusDDL);
  }

  TransportOrderStatusDDL(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.TransportOrderStatusDDL);
  }

  UpdateDeliveryOrderStatus(model: any): Observable<any> {
    return this.http.put<any>(API.UpdateDeliveryOrderStatus, model);
  }
  UpdateTransportOrderStatus(model: any): Observable<any> {
    return this.http.put<any>(API.UpdateTransportOrderStatus, model);
  }
}
