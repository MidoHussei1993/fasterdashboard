import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderWalletRoutingModule } from './provider-wallet-routing.module';
import { ProviderWalletListComponent } from './provider-wallet-list/provider-wallet-list.component';
import { ProviderWalletCrudComponent } from './provider-wallet-crud/provider-wallet-crud.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { IdentityRoutingModule } from '../identity/identity-routing.module';


@NgModule({
  declarations: [
    ProviderWalletListComponent,
    ProviderWalletCrudComponent
  ],
  imports: [
    CommonModule,
    ProviderWalletRoutingModule,
    IdentityRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ProviderWalletModule { }
