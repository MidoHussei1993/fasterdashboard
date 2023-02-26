import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportOrderNotificationRoutingModule } from './transport-order-notification-routing.module';
import { TransportOrderNotificationListComponent } from './transport-order-notification-list/transport-order-notification-list.component';
import { TransportOrderNotificationCrudComponent } from './transport-order-notification-crud/transport-order-notification-crud.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TransportOrderNotificationListComponent,
    TransportOrderNotificationCrudComponent
  ],
  imports: [
    CommonModule,
    TransportOrderNotificationRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class TransportOrderNotificationModule { }
