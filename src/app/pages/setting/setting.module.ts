import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting/setting.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserActionTrackingComponent } from './user-action-tracking/user-action-tracking.component';


@NgModule({
  declarations: [
    SettingComponent,
    UserActionTrackingComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SettingModule { }
