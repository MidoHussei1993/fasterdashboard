import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { BundlesOffer, BundlesOfferFilter, Dropdown, List } from '../..';

const API = END_POINTS.BundlesOffer;


@Injectable({
  providedIn: 'root'
})
export class BundlesOfferService {

  constructor(private http: HttpClient) {}

  create(model: BundlesOffer): Observable<BundlesOffer> {
    return this.http.post<BundlesOffer>(API.add, model);
  }

  get(filter:BundlesOfferFilter): Observable<List<BundlesOffer>> {
    return this.http.get<List<BundlesOffer>>(API.search, { params: { 
      ...(filter.PageSize && {PageSize: filter.PageSize}),
      ...(filter.PageNumber && {PageNumber: filter.PageNumber}),
      ...(filter.BundleName && {BundleName: filter.BundleName}),
      ...(filter.BundleNameAr && {BundleNameAr: filter.BundleNameAr}),
     ...(filter.CreateAtFrom && {CreateAtFrom:String(moment(filter.CreateAtFrom).format('YYYY-MM-DD HH:mm:ss'))}),
     ...(filter.CreateAtTo && {CreateAtTo:String(moment(filter.CreateAtTo).format('YYYY-MM-DD HH:mm:ss'))}),
     ...(filter.ExpiryDateFrom && {ExpiryDateFrom:String(moment(filter.ExpiryDateFrom).format('YYYY-MM-DD HH:mm:ss'))}),
     ...(filter.ExpiryDateTo && {ExpiryDateTo:String(moment(filter.ExpiryDateTo).format('YYYY-MM-DD HH:mm:ss'))}),
       } });
  }

  getByID(id: number): Observable<BundlesOffer> {
    return this.http.get<BundlesOffer>(API.getById(id));
  }

  update(model: BundlesOffer): Observable<BundlesOffer> {
    return this.http.put<BundlesOffer>(API.update , model);
  }

  getDropdown(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.getDell);
  }
}