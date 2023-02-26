import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { IdentityRoutingModule } from '../identity/identity-routing.module';
import { ProviderTrackingComponent } from './map/provider-tracking.component';
import { ProviderTrackingRoutingModule } from './provider-tracking-routing.module';


@NgModule({
  declarations: [
    ProviderTrackingComponent

  ],
  imports: [
    CommonModule,
    ProviderTrackingRoutingModule,
    IdentityRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ProviderTrackingModule { }
