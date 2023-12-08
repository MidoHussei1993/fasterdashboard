import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopBranchWorkTimeRoutingModule } from './shop-branch-work-time-routing.module';
import { ShopBranchWorkTimeListComponent } from './shop-branch-work-time-list/shop-branch-work-time-list.component';
import { ShopBranchWorkTimeCrudComponent } from './shop-branch-work-time-crud/shop-branch-work-time-crud.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddShopBranchesWorkTimeComponent } from './add-shop-branches-work-time/add-shop-branches-work-time.component';


@NgModule({
  declarations: [
    ShopBranchWorkTimeListComponent,
    ShopBranchWorkTimeCrudComponent,
    AddShopBranchesWorkTimeComponent
  ],
  imports: [
    CommonModule,
    ShopBranchWorkTimeRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ShopBranchWorkTimeModule { }
