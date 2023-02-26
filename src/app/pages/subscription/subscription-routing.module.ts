import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { SubscriptionCrudComponent } from './subscription-crud/subscription-crud.component';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: SubscriptionListComponent },
      { 
        path: 'create',
       component: SubscriptionCrudComponent, 
       data: {mode: FormMode.Create}
       },
      { path: 'edit/:id',
       component: SubscriptionCrudComponent , 
       data: {mode: FormMode.Edit}
      },
      { path: 'view/:id',
       component: SubscriptionCrudComponent , 
       data: {mode: FormMode.View}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionRoutingModule { }
