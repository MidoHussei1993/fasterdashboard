import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { offerDto } from '../model/offerDto';
import { OfferFilter } from '../model/offerFilter';
import { Dropdown, List } from 'src/app/shared/models';
import { OfferList } from '../model/offerList.model';
import * as moment from 'moment';

const offer_API = END_POINTS.offer;


@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) {}

  create(model: offerDto): Observable<any> {
    return this.http.post<any>(offer_API.add, model);
  }

  get(filter:OfferFilter): Observable<List<OfferList>> {
    return this.http.get<List<OfferList>>(offer_API.search, { params: {
      ...(filter.PageSize && {PageSize: filter.PageSize}),
      ...(filter.PageNumber && {PageNumber: filter.PageNumber}),
      ...(filter.ProductId && {ProductId: filter.ProductId}),
       ...(filter.ExpiryDateFrom && {ExpiryDateFrom: String(moment(filter.ExpiryDateFrom).format('YYYY-MM-DD HH:mm:ss'))}),
       ...(filter.CreateAtFrom && {CreateAtFrom: String(moment(filter.CreateAtFrom).format('YYYY-MM-DD HH:mm:ss'))}),
       ...(filter.CreateAtTo && {CreateAtTo: String(moment(filter.CreateAtTo).format('YYYY-MM-DD HH:mm:ss'))}),
      ...(filter.Description && {Description: filter.Description}),
      ...(filter.DescriptionAr && {BundleNameAr: filter.DescriptionAr}),

       } });
  }

  getByID(id: number): Observable<offerDto> {
    return this.http.get<offerDto>(offer_API.getById + `${id}`);
  }

  update( model: any): Observable<offerDto> {
    return this.http.put<offerDto>(offer_API.update , model);
  }

}
