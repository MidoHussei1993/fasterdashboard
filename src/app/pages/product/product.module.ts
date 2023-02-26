import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCrudComponent } from './product-crud/product-crud.component';
import { ProductDetailsCrudComponent } from './product-details-crud/product-details-crud.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BundleProductComponent } from './bundle-product/bundle-product.component';
import { ProductDetailsListComponent } from './product-details-list/product-details-list.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductCrudComponent,
    ProductDetailsCrudComponent,
    BundleProductComponent,
    ProductDetailsListComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ProductModule { }
