import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubAdditionalComponentTitleRoutingModule } from './sub-additional-component-title-routing.module';
import { SubAdditionalComponentTitleListComponent } from './sub-additional-component-title-list/sub-additional-component-title-list.component';
import { SubAdditionalComponentTitleCrudComponent } from './sub-additional-component-title-crud/sub-additional-component-title-crud.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    SubAdditionalComponentTitleCrudComponent,
    SubAdditionalComponentTitleListComponent
  ],
  imports: [
    CommonModule,
    SubAdditionalComponentTitleRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SubAdditionalComponentTitleModule { }
