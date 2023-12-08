import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopBranchRoutingModule } from './shop-branch-routing.module';
import { ShopBranchListComponent } from './shop-branch-list/shop-branch-list.component';
import { ShopBranchCrudComponent } from './shop-branch-crud/shop-branch-crud.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { WalletModule } from '../wallet/wallet.module';
import { WorkTimeComponent } from './work-time/work-time.component';


@NgModule({
  declarations: [
    ShopBranchListComponent,
    ShopBranchCrudComponent,
    WorkTimeComponent
  ],
  imports: [
    CommonModule,
    ShopBranchRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    WalletModule
  ]
})
export class ShopBranchModule { }
