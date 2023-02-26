import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FixedShopAmountRoutingModule } from './fixed-shop-amount-routing.module';
import { FixedShopAmountListComponent } from './fixed-shop-amount-list/fixed-shop-amount-list.component';
import { FixedShopAmountCrudComponent } from './fixed-shop-amount-crud/fixed-shop-amount-crud.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FixedShopAmountListComponent,
    FixedShopAmountCrudComponent
  ],
  imports: [
    CommonModule,
    FixedShopAmountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DropdownModule,
  ]
})
export class FixedShopAmountModule { }
