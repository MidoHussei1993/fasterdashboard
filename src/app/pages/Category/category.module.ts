import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryCrudComponent } from './Category-crud/Category-crud.component';
import { CategoryListComponent } from './Category-list/Category-list.component';
import { SafePipe } from './pipe/safe.pipe';

@NgModule({
  declarations: [
    CategoryCrudComponent,
    CategoryListComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CategoryModule { }
