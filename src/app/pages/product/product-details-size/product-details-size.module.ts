import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailsSizeRoutingModule } from './product-details-size-routing.module';
import { ProductDetailsSizeListComponent } from './product-details-size-list/product-details-size-list.component';
import { ProductDetailsSizeCrudComponent } from './product-details-size-crud/product-details-size-crud.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProductDetailsSizeListComponent,
    ProductDetailsSizeCrudComponent
  ],
  imports: [
    CommonModule,
    ProductDetailsSizeRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ProductDetailsSizeModule { }
