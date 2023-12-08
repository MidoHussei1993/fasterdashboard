import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdditionalComponentRoutingModule } from './additional-component-routing.module';
import { AdditionalComponentListComponent } from './additional-component-list/additional-component-list.component';
import { AdditionalComponentCrudComponent } from './additional-component-crud/additional-component-crud.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    AdditionalComponentListComponent,
    AdditionalComponentCrudComponent
  ],
  imports: [
    CommonModule,
    AdditionalComponentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CalendarModule
  ],
  exports: [
    AdditionalComponentListComponent,
    AdditionalComponentCrudComponent
  ]
})
export class AdditionalComponentModule { }
