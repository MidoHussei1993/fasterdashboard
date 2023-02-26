import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqsRoutingModule } from './faqs-routing.module';
import { FaqsListComponent } from './faqs-list/faqs-list.component';
import { FaqsCrudComponent } from './faqs-crud/faqs-crud.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FaqsListComponent,
    FaqsCrudComponent
  ],
  imports: [
    CommonModule,
    FaqsRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class FaqsModule { }
