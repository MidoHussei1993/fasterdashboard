import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoboneCrudComponent } from './cobone-crud/cobone-crud.component';
import { CoboneListComponent } from './cobone-list/cobone-list.component';
import { CoboneRoutingModule } from './cobone-routing.module';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';


@NgModule({
  declarations: [
    CoboneCrudComponent,
    CoboneListComponent
  ],
  imports: [
    CommonModule,
    CoboneRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    DropdownModule
  ]
})
export class CoboneModule { }
