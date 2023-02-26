import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerRoutingModule } from './banner-routing.module';
import { BannerListComponent } from './banner-list/banner-list.component';
import { BannerCrudComponent } from './banner-crud/banner-crud.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BannerListComponent,
    BannerCrudComponent
  ],
  imports: [
    CommonModule,
    BannerRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class BannerModule { }
