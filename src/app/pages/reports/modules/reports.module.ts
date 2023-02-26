import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoboneComponent } from '../components/cobone/cobone.component';
import { DeliveryOrderStatusDetailsReportComponent } from '../components/delivery-order-status-details-report/delivery-order-status-details-report.component';
import { DeliveryOrderStatusReportComponent } from '../components/delivery-order-status-report/delivery-order-status-report.component';
import { ProviderCountsReportComponent } from '../components/provider-counts-report/provider-counts-report.component';
import { ShopOrdersCountReportComponent } from '../components/shop-orders-count-report/shop-orders-count-report.component';
import { TransportOrderStatusDetailsReportComponent } from '../components/transport-order-status-details-report/transport-order-status-details-report.component';
import { TransportOrderStatusReportComponent } from '../components/transport-order-status-report/transport-order-status-report.component';
import { NgxPrintModule } from 'ngx-print';
import { CoboneRoutingModule } from './reports-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoboneTransactionComponent } from '../components/cobone-transaction/cobone-transaction.component';
import { CobonedelevriyComponent } from '../components/cobonedelevriy/cobonedelevriy.component';
import { SubscriptionComponent } from '../components/subscription/subscription.component';



@NgModule({
  declarations: [
    CoboneComponent,
     TransportOrderStatusReportComponent,
     DeliveryOrderStatusReportComponent,
     ShopOrdersCountReportComponent,
     ProviderCountsReportComponent,
     TransportOrderStatusDetailsReportComponent,
      DeliveryOrderStatusDetailsReportComponent ,
      CoboneTransactionComponent,
      SubscriptionComponent,
      CobonedelevriyComponent

  ],

  imports: [
    CommonModule,
    CoboneRoutingModule,
    FormsModule,
    NgxPrintModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

  ]
})
export class ReportsModule { }
