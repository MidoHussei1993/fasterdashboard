import { OfferFormComponent } from './components/offer-form/offer-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { OfferRoutingModule } from './offer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { SafePipe } from './pipe/safe.pipe';

@NgModule({
  imports: [
    CommonModule,
    OfferRoutingModule,
    InlineSVGModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
  ],
  declarations: [OfferFormComponent, OfferListComponent , SafePipe],
})
export class OfferModule {}
