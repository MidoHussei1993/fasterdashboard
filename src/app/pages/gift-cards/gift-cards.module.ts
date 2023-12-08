import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiftCardsRoutingModule } from './gift-cards-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { GiftCardsListComponent } from './gift-cards-list/gift-cards-list.component';
import { GiftCardsCrudComponent } from './gift-cards-crud/gift-cards-crud.component';
import { GiftCardTypesSendSearchComponent } from '../reports/components/gift-card-types-send-search/gift-card-types-send-search.component';

@NgModule({
  declarations: [
    GiftCardsListComponent,
    GiftCardsCrudComponent,
    // GiftCardTypesSendSearchComponent
  ],
  imports: [
    CommonModule,
    GiftCardsRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class GiftCardsModule {}
