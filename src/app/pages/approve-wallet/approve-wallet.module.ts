import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApproveWalletRoutingModule } from './approve-wallet-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApproveWalletListComponent } from './approve-wallet-list/approve-wallet-list.component';


@NgModule({
  declarations: [
    ApproveWalletListComponent
  ],
  imports: [
    CommonModule,
    ApproveWalletRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TabViewModule,
  ]
})
export class ApproveWalletModule { }
