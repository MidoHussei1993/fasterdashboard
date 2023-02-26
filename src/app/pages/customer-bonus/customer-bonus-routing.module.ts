import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { CustomerBonusCrudComponent } from './customer-bonus-crud/customer-bonus-crud.component';
import { CustomerBonusListComponent } from './customer-bonus-list/customer-bonus-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CustomerBonusListComponent },
      {
        path: 'create',
       component: CustomerBonusCrudComponent, 
       data: {mode: FormMode.Create}
       },
      { path: 'edit/:id',
       component: CustomerBonusCrudComponent , 
       data: {mode: FormMode.Edit}
      },
      { path: 'view/:id',
       component: CustomerBonusCrudComponent , 
       data: {mode: FormMode.View}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerBonusRoutingModule { }
