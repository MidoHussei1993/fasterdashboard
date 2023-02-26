import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { BundleCrudComponent } from './BundlesOffer-crud/BundlesOffer-crud.component';
import { BundleListComponent } from './BundlesOffer-list/BundlesOffer-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: BundleListComponent },
      {
        path: 'create',
       component: BundleCrudComponent,
       data: {type: FormMode.Create}
       },
      { path: 'edit/:id',
       component: BundleCrudComponent ,
       data: {type: FormMode.Edit}
      },
      { path: 'view/:id',
       component: BundleCrudComponent ,
       data: {type: FormMode.View}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BundleRoutingModule {}
