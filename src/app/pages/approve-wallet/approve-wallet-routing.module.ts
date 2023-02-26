import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveWalletListComponent } from './approve-wallet-list/approve-wallet-list.component';

const routes: Routes =  [
  {
    path: '',
    children: [
      { path: '', component: ApproveWalletListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApproveWalletRoutingModule { }
