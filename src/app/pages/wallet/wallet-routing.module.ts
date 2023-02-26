import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { FasterWalletCrudComponent } from './faster-wallet-crud/faster-wallet-crud.component';
import { FasterWalletListComponent } from './faster-wallet-list/faster-wallet-list.component';
import { ShopBranchWalletCrudComponent } from './shop-branch-wallet-crud/shop-branch-wallet-crud.component';
import { ShopBranchWalletListComponent } from './shop-branch-wallet-list/shop-branch-wallet-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: FasterWalletListComponent },
      {
        path: 'create',
       component: FasterWalletCrudComponent, 
       data: {mode: FormMode.Create}
       },
      { path: 'edit/:id',
       component: FasterWalletCrudComponent , 
       data: {mode: FormMode.Edit}
      },
      { path: 'view/:id',
       component: FasterWalletCrudComponent , 
       data: {mode: FormMode.View}
      },
      { path: 'branch-wallet', component: ShopBranchWalletListComponent },
      {
        path: 'branch-wallet/create/:id',
       component: ShopBranchWalletCrudComponent, 
       data: {mode: FormMode.Create}
       },
      { path: 'branch-wallet/edit/:id',
       component: ShopBranchWalletCrudComponent , 
       data: {mode: FormMode.Edit}
      },
      { path: 'branch-wallet/view/:id',
       component: ShopBranchWalletCrudComponent , 
       data: {mode: FormMode.View}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }
