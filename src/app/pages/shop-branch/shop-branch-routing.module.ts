import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { ShopBranchCrudComponent } from './shop-branch-crud/shop-branch-crud.component';
import { ShopBranchListComponent } from './shop-branch-list/shop-branch-list.component';
import { WorkTimeComponent } from './work-time/work-time.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ShopBranchListComponent },
      {
        path: 'create',
        component: ShopBranchCrudComponent,
        data: { mode: FormMode.Create },
      },
      {
        path: 'edit/:id',
        component: ShopBranchCrudComponent,
        data: { mode: FormMode.Edit },
      },
      {
        path: 'view/:id',
        component: ShopBranchCrudComponent,
        data: { mode: FormMode.View },
      },
      {
        path: 'work-time/:id',
        component: WorkTimeComponent,
        data: { mode: FormMode.View },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopBranchRoutingModule {}
