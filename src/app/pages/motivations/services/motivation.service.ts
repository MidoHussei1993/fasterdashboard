import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { Dropdown, List } from 'src/app/shared';
import { MotivationFilter, SingleMotivationFilter } from '../models';

const API = END_POINTS.Motivations;

@Injectable({
  providedIn: 'root',
})
export class MotivationService {
  constructor(private http: HttpClient) {}

  create(model: any): Observable<any> {
    return this.http.post<any>(API.add, model);
  }

  get(filter: MotivationFilter): Observable<List<any>> {
    return this.http.get<List<any>>(API.getAll, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.IsActive && { IsActive: filter.IsActive }),
        ...(filter.MotivationType && { MotivationType: filter.MotivationType }),
        ...(filter.CreateAtFrom && {
          CreateAtFrom: String(filter.CreateAtFrom),
        }),
        ...(filter.CreateAtTo && { CreateAtTo: String(filter.CreateAtTo) }),
      },
    });
  }

  getSalary(filter: MotivationFilter): Observable<List<any>> {
    return this.http.get<List<any>>(API.getSalary, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.IsActive && { IsActive: filter.IsActive }),
        ...(filter.MotivationType && { MotivationType: filter.MotivationType }),
        ...(filter.CreateAtFrom && {
          CreateAtFrom: String(filter.CreateAtFrom),
        }),
        ...(filter.CreateAtTo && { CreateAtTo: String(filter.CreateAtTo) }),
      },
    });
  }

  getByID(id: number, filter: SingleMotivationFilter): Observable<any> {
    return this.http.get<any>(API.getById(id), {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.Status && { Status: filter.Status }),
      },
    });
  }
  evaluate(id: number): Observable<any> {
    return this.http.get<any>(API.evaluate(id));
  }
  GetProviderMotivations(id: number): Observable<any> {
    return this.http.get<any>(API.GetProviderMotivations(id));
  }
  GetProviderMotivationProgress(
    providerId: number,
    MotivationId: number
  ): Observable<any> {
    return this.http.get<any>(
      API.GetProviderMotivationProgress(providerId, MotivationId)
    );
  }

  getMotivationTypeDDL(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.getMotivationTypeDDL);
  }

  delete(MotivationId: number): Observable<boolean> {
    return this.http.delete<boolean>(API.delete(MotivationId));
  }
  ChangeActivation(MotivationId: string): Observable<any> {
    return this.http.post<any>(API.ChangeActivation(MotivationId), {});
  }
  UploadProviderIdsExcel(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('excelFile', file);
    return this.http.post<any>(API.UploadProviderIdsExcel, formData);
  }

  DownloadExcelSample(): Observable<any> {
    return this.http.get<any>(API.DownloadExcelSample);
  }
}
