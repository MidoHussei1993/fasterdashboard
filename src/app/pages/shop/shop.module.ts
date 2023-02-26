import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShopCrudComponent } from './shop-crud/shop-crud.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopBranchOrderReportComponent } from './shop-branch-order-report/shop-branch-order-report.component';
import { WalletModule } from '../wallet/wallet.module';
import { BulkBranchWalletComponent } from './bulk-branch-wallet/bulk-branch-wallet.component';


@NgModule({
  declarations: [
    ShopListComponent,
    ShopCrudComponent,
    ShopBranchOrderReportComponent,
    BulkBranchWalletComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    WalletModule
  ]
})
export class ShopModule { }
