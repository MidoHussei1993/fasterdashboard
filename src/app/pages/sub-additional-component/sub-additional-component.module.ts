import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubAdditionalComponentRoutingModule } from './sub-additional-component-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubAdditionalComponentListComponent } from './sub-additional-component-list/sub-additional-component-list.component';
import { SubAdditionalComponentCrudComponent } from './sub-additional-component-crud/sub-additional-component-crud.component';


@NgModule({
  declarations: [
    SubAdditionalComponentListComponent,
    SubAdditionalComponentCrudComponent
  ],
  imports: [
    CommonModule,
    SubAdditionalComponentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CalendarModule
  ]
})
export class SubAdditionalComponentModule { }
