import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryRoutingModule } from './salary-routing.module';
import { SalaryListComponent } from './salary-list/salary-list.component';
import { SalaryCrudComponent } from './salary-crud/salary-crud.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SalaryListComponent, SalaryCrudComponent],
  imports: [
    CommonModule,
    SalaryRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
  ],
})
export class SalaryModule {}
