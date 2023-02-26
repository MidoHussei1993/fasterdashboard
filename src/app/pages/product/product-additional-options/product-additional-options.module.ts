import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductAdditionalOptionsRoutingModule } from './product-additional-options-routing.module';
import { ProductAdditionalOptionsListComponent } from './product-additional-options-list/product-additional-options-list.component';
import { ProductAdditionalOptionsCrudComponent } from './product-additional-options-crud/product-additional-options-crud.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProductAdditionalOptionsListComponent,
    ProductAdditionalOptionsCrudComponent
  ],
  imports: [
    CommonModule,
    ProductAdditionalOptionsRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ProductAdditionalOptionsModule { }
