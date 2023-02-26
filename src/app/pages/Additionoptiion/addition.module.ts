import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdditionListComponent } from './Addition-list/addition-list.component';
import { AdditionoptionCrudComponent } from './Additionoptiion-crud/Additionoptiion-crud.component';
import { AdditionRoutingModule } from './addition-routing.module';



@NgModule({
  declarations: [
    AdditionListComponent,
    AdditionoptionCrudComponent
  ],
  imports: [
    CommonModule,
    AdditionRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AdditionModule { }
