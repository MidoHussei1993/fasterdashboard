import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotivationsRoutingModule } from './motivations-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MotivationListComponent } from './motivation-list/motivation-list.component';
import { MotivationCrudComponent } from './motivation-crud/motivation-crud.component';
import {CalendarModule} from 'primeng/calendar';
import { ProviderMotivationsComponent } from './provider-motivations/provider-motivations.component';
import { ProviderMotivationsProgressComponent } from './provider-motivations-progress/provider-motivations-progress.component';


@NgModule({
  declarations: [
    MotivationListComponent,
    MotivationCrudComponent,
    ProviderMotivationsComponent,
    ProviderMotivationsProgressComponent
  ],
  imports: [
    CommonModule,
    MotivationsRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule
  ]
})
export class MotivationsModule { }
