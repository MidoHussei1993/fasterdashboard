import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponeRoutingModule } from './product-compone-routing.module';
import { ProductComponentCrudComponent } from './product-component-crud/product-component-crud.component';
import { ProductComponentListComponent } from './product-component-list/product-component-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProductComponentListComponent,
    ProductComponentCrudComponent
  ],
  imports: [
    CommonModule,
    ProductComponeRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    ProductComponentListComponent,
  ]
})
export class ProductComponeModule { }
