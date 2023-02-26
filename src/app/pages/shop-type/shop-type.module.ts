import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopTypeRoutingModule } from './shop-type-routing.module';
import { ShopTypeListComponent } from './shop-type-list/shop-type-list.component';
import { ShopTypeCrudComponent } from './shop-type-crud/shop-type-crud.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ShopTypeListComponent,
    ShopTypeCrudComponent
  ],
  imports: [
    CommonModule,
    ShopTypeRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ShopTypeModule { }
