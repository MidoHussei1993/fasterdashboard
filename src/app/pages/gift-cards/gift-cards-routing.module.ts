import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { GiftCardsCrudComponent } from './gift-cards-crud/gift-cards-crud.component';
import { GiftCardsListComponent } from './gift-cards-list/gift-cards-list.component';
import { GiftCardTypesSendSearchComponent } from '../reports/components/gift-card-types-send-search/gift-card-types-send-search.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: GiftCardsListComponent },
      {
        path: 'create',
        component: GiftCardsCrudComponent,
        data: { mode: FormMode.Create },
      },
      {
        path: 'edit/:id',
        component: GiftCardsCrudComponent,
        data: { mode: FormMode.Edit },
      },
      {
        path: 'view/:id',
        component: GiftCardsCrudComponent,
        data: { mode: FormMode.View },
      },
      // {
      //   path: 'send-search',
      //   component: GiftCardTypesSendSearchComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GiftCardsRoutingModule {}
