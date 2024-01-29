import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderRoutingModule } from './provider-routing.module';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProviderNotesListComponent } from './provider-notes-list/provider-notes-list.component';
import { ProviderNotesCrudComponent } from './provider-notes-crud/provider-notes-crud.component';
import { NearProviderComponent } from './near-provider/near-provider.component';
import { NearDeliveryProviderComponent } from './near-delivery-provider/near-delivery-provider.component';
import { ProviderAcceptanceReportComponent } from './provider-acceptance-report/provider-acceptance-report.component';
import { ProviderOrdersComponent } from './provider-orders/provider-orders.component';
import { TabViewModule } from 'primeng/tabview';
import { FilesComponent } from './files/files.component';
import { DriversOpenRegistrationComponent } from './drivers-open-registration/drivers-open-registration.component';
import { TrackingProvidersComponent } from './tracking-providers/tracking-providers.component';
import { AmountRequestsComponent } from './amount-requests/amount-requests.component';

@NgModule({
  declarations: [
    ProviderListComponent,
    ProviderNotesListComponent,
    ProviderNotesCrudComponent,
    NearProviderComponent,
    NearDeliveryProviderComponent,
    ProviderAcceptanceReportComponent,
    ProviderOrdersComponent,
    FilesComponent,
    DriversOpenRegistrationComponent,
    TrackingProvidersComponent,
    AmountRequestsComponent,
  ],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TabViewModule,
  ],
  exports: [ProviderNotesListComponent, TrackingProvidersComponent],
})
export class ProviderModule {}
