import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryOrderNotificationRoutingModule } from './delivery-order-notification-routing.module';
import { DeliveryOrderNotificationListComponent } from './delivery-order-notification-list/delivery-order-notification-list.component';
import { DeliveryOrderNotificationCrudComponent } from './delivery-order-notification-crud/delivery-order-notification-crud.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DeliveryOrderNotificationListComponent,
    DeliveryOrderNotificationCrudComponent
  ],
  imports: [
    CommonModule,
    DeliveryOrderNotificationRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class DeliveryOrderNotificationModule { }
