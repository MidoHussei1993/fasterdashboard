import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { BulkBranchWalletComponent } from './bulk-branch-wallet/bulk-branch-wallet.component';
import { ShopBranchOrderReportComponent } from './shop-branch-order-report/shop-branch-order-report.component';
import { ShopCrudComponent } from './shop-crud/shop-crud.component';
import { ShopListComponent } from './shop-list/shop-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ShopListComponent },
      {
        path: 'create',
        component: ShopCrudComponent,
        data: { mode: FormMode.Create },
      },
      {
        path: 'edit/:id',
        component: ShopCrudComponent,
        data: { mode: FormMode.Edit },
      },
      {
        path: 'view/:id',
        component: ShopCrudComponent,
        data: { mode: FormMode.View },
      },
      {
        path: 'order-report',
        component: ShopBranchOrderReportComponent,
        data: { mode: FormMode.View },
      },
      {
        path: 'bulk-branch-wallet',
        component: BulkBranchWalletComponent,
        data: { mode: FormMode.View },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
