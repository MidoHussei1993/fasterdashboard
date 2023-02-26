import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoNumberPipe } from './pipes/demo-number.pipe';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { TableListComponent } from './components/table-list/table-list.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { EchartComponent } from './components/echart/echart.component';
import { ImgViewerComponent } from './components/img-viewer/img-viewer.component';
import { FilterComponent } from './components/filter/filter.component';
import { ExcelService } from './services/excel.service';
import {CalendarModule} from 'primeng/calendar';
import { ListComponent } from './components/list/list.component';
import { PolygonMapComponent } from './components/polygon-map/polygon-map.component';
import { NgxPrintModule } from 'ngx-print';
import { KeyboardDirective } from './directives/keyboard.directive';


const Component = [
  TableComponent,
  GoogleMapComponent,
  TableListComponent,
  ImgViewerComponent,
  FilterComponent,
  EchartComponent,
  PolygonMapComponent
]
const Pipes= [
  DemoNumberPipe
]

const directives = [
  KeyboardDirective,
]
@NgModule({
  declarations: [
    ...Component,
    ...Pipes,
    ...directives,
    ListComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
    GoogleMapsModule,
    CalendarModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  providers: [ExcelService],
  exports: [
    RouterModule,
    TranslateModule,
    CommonModule,
    ...Component,
    ...Pipes,
    ...directives
  ]
})
export class SharedModule { }
