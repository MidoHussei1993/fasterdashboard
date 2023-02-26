import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { CreateComponent } from './create/create.component';
import { ProviderSubscriptionCrudComponent } from './provider-subscription-crud/provider-subscription-crud.component';
import { ProviderSubscriptionListComponent } from './provider-subscription-list/provider-subscription-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ProviderSubscriptionListComponent },
      {
        path: 'create',
       component: CreateComponent, 
       data: {mode: FormMode.Create}
       },
      { path: 'edit/:id',
       component: ProviderSubscriptionCrudComponent , 
       data: {mode: FormMode.Edit}
      },
      { path: 'view/:id',
       component: ProviderSubscriptionCrudComponent , 
       data: {mode: FormMode.View}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderSubscriptionRoutingModule { }
