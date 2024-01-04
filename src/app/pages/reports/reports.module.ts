import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ActiveProvidersComponent } from './components/active-providers/active-providers.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeliveryOrderComponent } from './components/delivery-order/delivery-order.component';
import { TransportOrderComponent } from './components/transport-order/transport-order.component';
import { DeliveryOrderCrudComponent } from './components/delivery-order-crud/delivery-order-crud.component';
import { TransportOrderCrudComponent } from './components/transport-order-crud/transport-order-crud.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkTimeComponent } from './components/work-time/work-time.component';
import { TransportOrderDetailsComponent } from './components/transport-order-details/transport-order-details.component';
import { DeliveryOrderDetailsComponent } from './components/delivery-order-details/delivery-order-details.component';
import { TaxsReportComponent } from './components/taxs-report/taxs-report.component';
import { CustomerOrderStatusComponent } from './components/customer-order-status/customer-order-status.component';
import { AllProvidersWorkingTimeComponent } from './components/all-providers-working-time/all-providers-working-time.component';
import { ProviderWalletReportComponent } from './components/provider-wallet-report/provider-wallet-report.component';
import { CustomerWalletReportComponent } from './components/customer-wallet-report/customer-wallet-report.component';
import { CustomerOrderComponent } from './components/customer-order/customer-order.component';
import { TabViewModule } from 'primeng/tabview';
import { IgnoredOrderComponent } from './components/ignored-order/ignored-order.component';
import { CalendarModule } from 'primeng/calendar';
import { HeatMapComponent } from './components/heat-map/heat-map.component';
import { WalletManualAdditionComponent } from './components/wallet-manual-addition/wallet-manual-addition.component';
import { CustomerWalletManualAdditionComponent } from './components/customer-wallet-manual-addition/customer-wallet-manual-addition.component';
import { RewardsCompensationComponent } from './components/rewards-compensation/rewards-compensation.component';
import { CustomerLastLoginComponent } from './components/customer-last-login/customer-last-login.component';
import { DeliveryOrderStatusComponent } from './components/delivery-order-status/delivery-order-status.component';
import { CustomerReferrerComponent } from './components/customer-referrer/customer-referrer.component';
import { AddedFromPaymentComponent } from './components/added-from-payment/added-from-payment.component';
import { ShopProfitComponent } from './components/shop-profit/shop-profit.component';
// import { NgxPrintModule } from 'ngx-print';
import { AllReportComponent } from './all-report/all-report.component';
import { GiftCardTypesSendSearchComponent } from './components/gift-card-types-send-search/gift-card-types-send-search.component';
import { OpenDeliveryOrderComponent } from './components/open-delivery-order/open-delivery-order.component';
import { ClosedDeliveryOrderComponent } from './components/closed-delivery-order/closed-delivery-order.component';

@NgModule({
  declarations: [
    GiftCardTypesSendSearchComponent,
    ActiveProvidersComponent,
    DeliveryOrderComponent,
    TransportOrderComponent,
    DeliveryOrderCrudComponent,
    TransportOrderCrudComponent,
    WorkTimeComponent,
    TransportOrderDetailsComponent,
    DeliveryOrderDetailsComponent,
    TaxsReportComponent,
    CustomerOrderStatusComponent,
    AllProvidersWorkingTimeComponent,
    ProviderWalletReportComponent,
    CustomerWalletReportComponent,
    CustomerOrderComponent,
    IgnoredOrderComponent,
    HeatMapComponent,
    WalletManualAdditionComponent,
    CustomerWalletManualAdditionComponent,
    RewardsCompensationComponent,
    CustomerLastLoginComponent,
    DeliveryOrderStatusComponent,
    CustomerReferrerComponent,
    AddedFromPaymentComponent,
    ShopProfitComponent,
    AllReportComponent,
    OpenDeliveryOrderComponent,
    ClosedDeliveryOrderComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    // NgxPrintModule,
    TabViewModule,
  ],
})
export class ReportsModule {}
