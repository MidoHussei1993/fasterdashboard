import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { ShopBranchWorkTimeCrudComponent } from './shop-branch-work-time-crud/shop-branch-work-time-crud.component';
import { ShopBranchWorkTimeListComponent } from './shop-branch-work-time-list/shop-branch-work-time-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ShopBranchWorkTimeListComponent },
      { 
        path: 'create',
       component: ShopBranchWorkTimeCrudComponent, 
       data: {mode: FormMode.Create}
       },
      { path: 'edit/:id',
       component: ShopBranchWorkTimeCrudComponent , 
       data: {mode: FormMode.Edit}
      },
      { path: 'view/:id',
       component: ShopBranchWorkTimeCrudComponent , 
       data: {mode: FormMode.View}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopBranchWorkTimeRoutingModule { }
