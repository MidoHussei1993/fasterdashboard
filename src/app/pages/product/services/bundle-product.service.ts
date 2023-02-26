import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { BundleProduct } from '../models';

const API = END_POINTS.BundleProduct;
interface IProductAactivation{
  id:number;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BundleProductService {

  constructor(private http: HttpClient) {}

  create(model: BundleProduct): Observable<BundleProduct> {
    return this.http.post<BundleProduct>(API.add, model);
  }
  ChangeBundleProductActivation(model:IProductAactivation ): Observable<IProductAactivation> {
    return this.http.put<IProductAactivation>(API.ChangeBundleProductActivation, model);
  }

}
