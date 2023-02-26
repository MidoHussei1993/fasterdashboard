import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { Dropdown, List } from 'src/app/shared/models';
import { BundleOfferFilter, BundlesOffer } from '../models';

const API = END_POINTS.bundle;



@Injectable({
  providedIn: 'root',
})
export class BundleOfferService {
  constructor(private http: HttpClient) {}

  create(model: BundlesOffer): Observable<any> {
    return this.http.post<any>(API.add, model);
  }

  get(filter:BundleOfferFilter): Observable<List<BundlesOffer>> {
    return this.http.get<List<BundlesOffer>>(API.search, { params: {
      ...(filter.PageSize && {PageSize: filter.PageSize}),
      ...(filter.PageNumber && {PageNumber: filter.PageNumber}),
      ...(filter.ExpiryDateFrom && {ExpiryDateFrom: String(moment(filter.ExpiryDateFrom).format('YYYY-MM-DD HH:mm:ss'))}),
      ...(filter.CreateAtFrom && {CreateAtFrom: String(moment(filter.CreateAtFrom).format('YYYY-MM-DD HH:mm:ss'))}),
      ...(filter.CreateAtTo && {CreateAtTo: String(moment(filter.CreateAtTo).format('YYYY-MM-DD HH:mm:ss'))}),
      ...(filter.BundleName && {BundleName: filter.BundleName}),
      ...(filter.BundleNameAr && {BundleNameAr: filter.BundleNameAr}),

       } });
  }

  getByID(id: number): Observable<BundlesOffer> {
    return this.http.get<BundlesOffer>(API.getById + `${id}`);
  }

  update( model: any): Observable<BundlesOffer> {
    return this.http.put<BundlesOffer>(API.update , model);
  }

  Deleted(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.getDell);
  }
  ChangeActivation(id: string): Observable<any> {
    return this.http.post<any>(API.ChangeActivation(id),{});
  }
}
