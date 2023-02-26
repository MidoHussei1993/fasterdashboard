import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { ProductComponent } from '../models';

const API = END_POINTS.ProductComponant;

@Injectable({
  providedIn: 'root'
})
export class ProductComponentService {
  constructor(private http: HttpClient) {}

  create(model: ProductComponent): Observable<ProductComponent> {
    return this.http.post<ProductComponent>(API.add, model);
  }


  getByID(id: number): Observable<ProductComponent> {
    return this.http.get<ProductComponent>(API.getById(id));
  }

  update(model: ProductComponent): Observable<ProductComponent> {
    return this.http.put<ProductComponent>(API.update, model);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(API.delete + id);
  }

  ChangeActivation(id: number): Observable<ProductComponent> {
    return this.http.post<ProductComponent>(API.ChangeActivation(id),{});
  }
  
}
