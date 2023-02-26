import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { CoboneTransactionComponent } from '../components/cobone-transaction/cobone-transaction.component';
import { CoboneComponent } from '../components/cobone/cobone.component';
import { CobonedelevriyComponent } from '../components/cobonedelevriy/cobonedelevriy.component';
import { DeliveryOrderStatusDetailsReportComponent } from '../components/delivery-order-status-details-report/delivery-order-status-details-report.component';
import { DeliveryOrderStatusReportComponent } from '../components/delivery-order-status-report/delivery-order-status-report.component';
import { ShopOrdersCountReportComponent } from '../components/shop-orders-count-report/shop-orders-count-report.component';
import { SubscriptionComponent } from '../components/subscription/subscription.component';
import { TransportOrderStatusDetailsReportComponent } from '../components/transport-order-status-details-report/transport-order-status-details-report.component';
import { TransportOrderStatusReportComponent } from '../components/transport-order-status-report/transport-order-status-report.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CoboneComponent },
      { path: 'cobone-report', component: CoboneComponent },
      { path: 'trasport/:id', component: CoboneTransactionComponent },
      { path: 'delivery/:id', component: CobonedelevriyComponent },
      { path: 'details/:id', component:TransportOrderStatusReportComponent },

      { path: 'Order_Report', component: TransportOrderStatusDetailsReportComponent },
      { path: 'delivery_order', component: DeliveryOrderStatusReportComponent },
      { path: 'Shop_Resturant', component: ShopOrdersCountReportComponent },
      { path: 'SubScription', component: SubscriptionComponent },






      { path: '', component: CoboneComponent },
      { path: '', component: CoboneComponent },
      { path: '', component: CoboneComponent },


    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoboneRoutingModule {}
