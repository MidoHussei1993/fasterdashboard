import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdditionalOptionRoutingModule } from './additional-option-routing.module';
import { AdditionalOptionListComponent } from './additional-option-list/additional-option-list.component';
import { AdditionalOptionCrudComponent } from './additional-option-crud/additional-option-crud.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AdditionalOptionListComponent,
    AdditionalOptionCrudComponent
  ],
  imports: [
    CommonModule,
    AdditionalOptionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class AdditionalOptionModule { }
