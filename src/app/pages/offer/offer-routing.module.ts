import { OfferFormComponent } from './components/offer-form/offer-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { FormMode } from 'src/app/shared';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: OfferListComponent },
      {
        path: 'create',
       component: OfferFormComponent,
       data: {mode: FormMode.Create}
       },
      { path: 'edit/:id',
       component: OfferFormComponent ,
       data: {mode: FormMode.Edit}
      },
      { path: 'view/:id',
       component: OfferFormComponent ,
       data: {mode: FormMode.View}
      }
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferRoutingModule {}
