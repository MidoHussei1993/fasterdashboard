import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { ProviderWalletCrudComponent } from './provider-wallet-crud/provider-wallet-crud.component';
import { ProviderWalletListComponent } from './provider-wallet-list/provider-wallet-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ProviderWalletListComponent },
      { 
        path: 'create',
       component: ProviderWalletCrudComponent, 
       data: {mode: FormMode.Create}
       },
      // { path: 'edit/:id',
      //  component: ProviderWalletCrudComponent , 
      //  data: {mode: FormMode.Edit}
      // },
      // { path: 'view/:id',
      //  component: ProviderWalletCrudComponent , 
      //  data: {mode: FormMode.View}
      // }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderWalletRoutingModule { }
