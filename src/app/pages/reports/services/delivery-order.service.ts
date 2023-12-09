import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';

const API = END_POINTS.DeliveryOrder;

@Injectable({
  providedIn: 'root',
})
export class DeliveryOrderService {
  constructor(private http: HttpClient) {}

  getNote(id: number): Observable<any> {
    return this.http.get<any>(API.getNote(id));
  }
  UpdateNote(model: any): Observable<any> {
    return this.http.post<any>(API.UpdateNote, model);
  }
  GetNearProviderToOrder(orderId: any, radius: string): Observable<any> {
    return this.http.get<any>(API.GetNearProviderToOrder(orderId, radius));
  }
  manualAssignment(
    orderId: any,
    price: string,
    providerUserId
  ): Observable<any> {
    return this.http.post<any>(
      API.manualAssignment(orderId, price, providerUserId),
      {}
    );
  }
  ChangeOrderAmountPrice(orderId: any, price: string): Observable<any> {
    return this.http.get<any>(API.ChangeOrderAmountPrice(orderId, price));
  }

  getOrderCart(id: number): Observable<any> {
    return this.http.get<any>(API.getOrderCart(id));
  }

  acceptOrder(id: number): Observable<any> {
    return this.http.post<any>(API.acceptOrder(id), {});
  }

  rejectOrder(id: number): Observable<any> {
    return this.http.post<any>(API.rejectOrder(id), {});
  }

  sendOrderToLyve(id: number): Observable<any> {
    return this.http.post<any>(API.SendOrderToLyve(id), {});
  }
}
