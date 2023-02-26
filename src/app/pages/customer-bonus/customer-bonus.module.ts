import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerBonusRoutingModule } from './customer-bonus-routing.module';
import { CustomerBonusListComponent } from './customer-bonus-list/customer-bonus-list.component';
import { CustomerBonusCrudComponent } from './customer-bonus-crud/customer-bonus-crud.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    CustomerBonusListComponent,
    CustomerBonusCrudComponent
  ],
  imports: [
    CommonModule,
    CustomerBonusRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    CalendarModule,
    FormsModule,
  ]
})
export class CustomerBonusModule { }
