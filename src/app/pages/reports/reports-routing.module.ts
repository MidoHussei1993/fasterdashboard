import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { ActiveProvidersComponent } from './components/active-providers/active-providers.component';
import { AddedFromPaymentComponent } from './components/added-from-payment/added-from-payment.component';
import { AllProvidersWorkingTimeComponent } from './components/all-providers-working-time/all-providers-working-time.component';
import { CustomerLastLoginComponent } from './components/customer-last-login/customer-last-login.component';
import { CustomerOrderStatusComponent } from './components/customer-order-status/customer-order-status.component';
import { CustomerOrderComponent } from './components/customer-order/customer-order.component';
import { CustomerReferrerComponent } from './components/customer-referrer/customer-referrer.component';
import { CustomerWalletManualAdditionComponent } from './components/customer-wallet-manual-addition/customer-wallet-manual-addition.component';
import { CustomerWalletReportComponent } from './components/customer-wallet-report/customer-wallet-report.component';
import { DeliveryOrderCrudComponent } from './components/delivery-order-crud/delivery-order-crud.component';
import { DeliveryOrderDetailsComponent } from './components/delivery-order-details/delivery-order-details.component';
import { DeliveryOrderStatusComponent } from './components/delivery-order-status/delivery-order-status.component';
import { DeliveryOrderComponent } from './components/delivery-order/delivery-order.component';
import { HeatMapComponent } from './components/heat-map/heat-map.component';
import { IgnoredOrderComponent } from './components/ignored-order/ignored-order.component';
import { ProviderWalletReportComponent } from './components/provider-wallet-report/provider-wallet-report.component';
import { RewardsCompensationComponent } from './components/rewards-compensation/rewards-compensation.component';
import { ShopProfitComponent } from './components/shop-profit/shop-profit.component';
import { TaxsReportComponent } from './components/taxs-report/taxs-report.component';
import { TransportOrderCrudComponent } from './components/transport-order-crud/transport-order-crud.component';
import { TransportOrderDetailsComponent } from './components/transport-order-details/transport-order-details.component';
import { TransportOrderComponent } from './components/transport-order/transport-order.component';
import { WalletManualAdditionComponent } from './components/wallet-manual-addition/wallet-manual-addition.component';
import { WorkTimeComponent } from './components/work-time/work-time.component';

const routes: Routes = [
  {
    path: 'active-providers',
    component: ActiveProvidersComponent,
  },
  {
    path: 'delivery-order',
    component: DeliveryOrderComponent,
  },
  {
    path: 'delivery-order/edit/:id',
    component: DeliveryOrderDetailsComponent,
    data: { mode: FormMode.Edit },
  },
  {
    path: 'delivery-order/details/:id',
    component: DeliveryOrderDetailsComponent,
    data: { mode: FormMode.View },
  },
  {
    path: 'transport-order',
    component: TransportOrderComponent,
  },
  {
    path: 'transport-order/edit/:id',
    component: TransportOrderDetailsComponent,
    data: { mode: FormMode.Edit },
  },
  {
    path: 'transport-order/details/:id',
    component: TransportOrderDetailsComponent,
    data: { mode: FormMode.View },
  },
  {
    path: 'work-time/:id',
    component: WorkTimeComponent,
  },
  {
    path: 'taxs',
    component: TaxsReportComponent,
  },
  {
    path: 'customer-order-status',
    component: CustomerOrderStatusComponent,
  },
  {
    path: 'providers-working-time',
    component: AllProvidersWorkingTimeComponent,
  },
  {
    path: 'customer-wallet',
    component: CustomerWalletReportComponent,
  },
  {
    path: 'provider-wallet',
    component: ProviderWalletReportComponent,
  },
  {
    path: 'customer-order/:id',
    component: CustomerOrderComponent,
  },
  {
    path: 'ignored-order',
    component: IgnoredOrderComponent,
  },
  {
    path: 'heat-map',
    component: HeatMapComponent,
  },
  {
    path: 'wallet-manual-addition',
    component: WalletManualAdditionComponent,
  },
  {
    path: 'customer-wallet-manual-addition',
    component: CustomerWalletManualAdditionComponent,
  },
  {
    path: 'rewards-compensation',
    component: RewardsCompensationComponent,
  },
  {
    path: 'customer-last-login',
    component: CustomerLastLoginComponent,
  },
  {
    path: 'delivery-order-status',
    component: DeliveryOrderStatusComponent,
  },
  {
    path: 'customer-referrer/:id',
    component: CustomerReferrerComponent,
  },
  {
    path: 'added-from-payment',
    component: AddedFromPaymentComponent,
  },
  {
    path: 'shop-profit',
    component: ShopProfitComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
