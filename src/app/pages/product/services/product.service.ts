import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { Dropdown, List } from 'src/app/shared';
import { Banner } from '../../banner/models';
import { Product, ProductFilter, ProductList, ProductDetails, ProductAdditionalOption } from '../models';


const API = END_POINTS.Product;

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  createProduect(model: Banner): Observable<Product> {
    return this.http.post<Product>(API.AddProduct, model);
  }

  getProducts(filter:ProductFilter): Observable<List<ProductList>> {
    return this.http.get<List<ProductList>>(API.search, { params: { 
      ...(filter.PageSize && {PageSize: filter.PageSize}),
      ...(filter.PageNumber && {PageNumber: filter.PageNumber}),
      ...(filter.CategoryId && {CategoryId: filter.CategoryId}),
      ...(filter.ShopId && {ShopId: filter.ShopId}),
      ...(filter.IsOffer && {IsOffer: filter.IsOffer}),
      ...(filter.ProductAr && {ProductAr: filter.ProductAr}),
      ...(filter.Product && {Product: filter.Product}),
       ...(filter.CreateAtFrom && {CreateAtFrom: String(moment(filter.CreateAtFrom).format('YYYY-MM-DD HH:mm:ss'))}),
       ...(filter.CreateAtTo && {CreateAtTo: String(moment(filter.CreateAtTo).format('YYYY-MM-DD HH:mm:ss'))}),
       } });
  }

  getProductByID(id: number): Observable<Product> {
    return this.http.get<Product>(API.GetProductById(id));
  }

  updateProduct(model: Product): Observable<Product> {
    return this.http.put<Product>(API.UpdateProduct , model);
  }

  getProductsDDL(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.GetProductsDDL);
  }
  getProductsDDLByShopId(id:number): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.GetProductsDDL + `/${id}`);
  }

  uploadProductImage(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(API.UploadProductImage, formData);
  }
  createProduectDetails(model: ProductDetails): Observable<ProductDetails> {
    return this.http.post<ProductDetails>(API.AddProductDetails, model);
  }
  changeProductActivation(id: number): Observable<Product> {
    return this.http.post<Product>(API.changeProductActivation(id),{});
  }
  ChangeProductDetailsSizeActivation(ProductSizeId: number): Observable<Product> {
    return this.http.post<Product>(API.ChangeProductDetailsSizeActivation(ProductSizeId),{});
  }


  getProductDetailsByID(id: number): Observable<ProductDetails> {
    return this.http.get<ProductDetails>(API.GetDetailsById(id));
  }

  updateProductDetails(model: ProductDetails): Observable<ProductDetails> {
    return this.http.put<ProductDetails>(API.UpdateProductDetails , model);
  }

  uploadProductDetailsImage(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(API.UploadDetailsImage, formData);
  }

  GetProductAdditionalOptions(id: number): Observable<ProductAdditionalOption[]> {
    return this.http.get<ProductAdditionalOption[]>(API.GetProductAdditionalOptions(id));
  }

  GetDetailsDDL(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.GetDetailsDDL);
  }
  getProductDetailsByProductId(id:number): Observable<ProductDetails[]> {
    return this.http.get<ProductDetails[]>(API.getProductDetailsByProductId(id));
  }
  changeProductDetailsActivation(id: number): Observable<ProductDetails> {
    return this.http.post<ProductDetails>(API.changeProductDetailsActivation(id),{});
  }

}