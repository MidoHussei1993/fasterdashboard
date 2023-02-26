import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { ShopBranchWalletCrudComponent } from './shop-branch-wallet-crud/shop-branch-wallet-crud.component';
import { FasterWalletListComponent } from './faster-wallet-list/faster-wallet-list.component';
import { FasterWalletCrudComponent } from './faster-wallet-crud/faster-wallet-crud.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ShopBranchWalletListComponent } from './shop-branch-wallet-list/shop-branch-wallet-list.component';


@NgModule({
  declarations: [
    ShopBranchWalletCrudComponent,
    FasterWalletListComponent,
    FasterWalletCrudComponent,
    ShopBranchWalletListComponent
  ],
  imports: [
    CommonModule,
    WalletRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports:[
    ShopBranchWalletCrudComponent
  ]
})
export class WalletModule { }
