import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderSubscriptionRoutingModule } from './provider-subscription-routing.module';
import { ProviderSubscriptionListComponent } from './provider-subscription-list/provider-subscription-list.component';
import { ProviderSubscriptionCrudComponent } from './provider-subscription-crud/provider-subscription-crud.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations: [
    ProviderSubscriptionListComponent,
    ProviderSubscriptionCrudComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    ProviderSubscriptionRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ProviderSubscriptionModule { }
