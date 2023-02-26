import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { FixedShopAmountCrudComponent } from './fixed-shop-amount-crud/fixed-shop-amount-crud.component';
import { FixedShopAmountListComponent } from './fixed-shop-amount-list/fixed-shop-amount-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: FixedShopAmountListComponent },
      {
        path: ':shopId/create',
        component: FixedShopAmountCrudComponent,
        data: { mode: FormMode.Create },
      },
      {
        path: ':shopId/edit/:id',
        component: FixedShopAmountCrudComponent,
        data: { mode: FormMode.Edit },
      },
      {
        path: ':shopId/view/:id',
        component: FixedShopAmountCrudComponent,
        data: { mode: FormMode.View },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixedShopAmountRoutingModule { }
