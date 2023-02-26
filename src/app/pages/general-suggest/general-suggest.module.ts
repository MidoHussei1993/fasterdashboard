import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralSuggestRoutingModule } from './general-suggest-routing.module';
import { GeneralSuggestListComponent } from './general-suggest-list/general-suggest-list.component';
import { GeneralSuggestCrudComponent } from './general-suggest-crud/general-suggest-crud.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    GeneralSuggestListComponent,
    GeneralSuggestCrudComponent
  ],
  imports: [
    CommonModule,
    GeneralSuggestRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class GeneralSuggestModule { }
