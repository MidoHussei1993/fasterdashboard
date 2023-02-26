import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggerRoutingModule } from './logger-routing.module';
import { LoggerListComponent } from './logger-list/logger-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LoggerListComponent
  ],
  imports: [
    CommonModule,
    LoggerRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class LoggerModule { }
