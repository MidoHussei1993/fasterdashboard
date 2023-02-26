import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderTrackingComponent } from './map/provider-tracking.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ProviderTrackingComponent }
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
export class ProviderTrackingRoutingModule { }
