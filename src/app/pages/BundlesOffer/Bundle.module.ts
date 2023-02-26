import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BundleListComponent } from './BundlesOffer-list/BundlesOffer-list.component';
import { BundleCrudComponent } from './BundlesOffer-crud/BundlesOffer-crud.component';
import { BundleRoutingModule } from './Bundle-routing.module';


@NgModule({
  declarations: [
    BundleListComponent,
    BundleCrudComponent
  ],
  imports: [
    CommonModule,
    BundleRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class BundleModule { }
