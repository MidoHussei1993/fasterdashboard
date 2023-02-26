import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { Dropdown, List } from 'src/app/shared';
import { NotificationFilter } from '../models';

const API = END_POINTS.AppNotifications;


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  create(model: any): Observable<Notification> {
    return this.http.post<Notification>(API.add, model);
  }

  get(filter: NotificationFilter): Observable<List<Notification>> {
    return this.http.get<List<Notification>>(API.getAll, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
         ...(filter.CreateAtFrom && {CreateAtFrom: String(moment(filter.CreateAtFrom).format('YYYY-MM-DD HH:mm:ss'))}),
         ...(filter.CreateAtTo && {CreateAtTo: String(moment(filter.CreateAtTo).format('YYYY-MM-DD HH:mm:ss'))}),
      },
    });
  }

  getByID(id: number): Observable<Notification> {
    return this.http.get<Notification>(API.getById(id));
  }

  reSend(id: number): Observable<Notification> {
    return this.http.post<Notification>(API.reSend(id),{});
  }

  update(model: any): Observable<Notification> {
    return this.http.put<Notification>(API.update, model);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(API.delete(id));
  }

  getNotificationTypeDDL(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.getNotificationTypeDDL);
  }

  getNotificationUserTypeDDL(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.getNotificationUserTypeDDL);
  }

  UploadProviderIdsExcel(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('excelFile', file);
    return this.http.post<any>(API.UploadProviderIdsExcel, formData);
  }

  UploadCustomerIdsExcel(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('excelFile', file);
    return this.http.post<any>(API.UploadCustomerIdsExcel, formData);
  }

  DownloadExcelSample(): Observable<any> {
    return this.http.get<any>(API.DownloadExcelSample);
  }
  
}
