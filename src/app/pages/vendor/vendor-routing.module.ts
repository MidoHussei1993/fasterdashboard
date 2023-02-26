import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { VendorCrudComponent } from './vendor-crud/vendor-crud.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: VendorListComponent },
      {
        path: 'create',
        component: VendorCrudComponent,
        data: { mode: FormMode.Create },
      },
      {
        path: 'edit/:id',
        component: VendorCrudComponent,
        data: { mode: FormMode.Edit },
      },
      {
        path: 'view/:id',
        component: VendorCrudComponent,
        data: { mode: FormMode.View },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
