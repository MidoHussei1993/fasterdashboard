import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdditionalComponentTitleRoutingModule } from './additional-component-title-routing.module';
import { AdditionalComponentTitleListComponent } from './additional-component-title-list/additional-component-title-list.component';
import { AdditionalComponentTitleCrudComponent } from './additional-component-title-crud/additional-component-title-crud.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdditionalComponentTitleListComponent,
    AdditionalComponentTitleCrudComponent
  ],
  imports: [
    CommonModule,
    AdditionalComponentTitleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class AdditionalComponentTitleModule { }
