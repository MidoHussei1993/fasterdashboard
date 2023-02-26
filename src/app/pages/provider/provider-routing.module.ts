import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { DriversOpenRegistrationComponent } from './drivers-open-registration/drivers-open-registration.component';
import { FilesComponent } from './files/files.component';
import { NearDeliveryProviderComponent } from './near-delivery-provider/near-delivery-provider.component';
import { NearProviderComponent } from './near-provider/near-provider.component';
import { ProviderAcceptanceReportComponent } from './provider-acceptance-report/provider-acceptance-report.component';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { ProviderNotesCrudComponent } from './provider-notes-crud/provider-notes-crud.component';
import { ProviderNotesListComponent } from './provider-notes-list/provider-notes-list.component';
import { ProviderOrdersComponent } from './provider-orders/provider-orders.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ProviderListComponent },
      { path: 'notes/:id', component: ProviderNotesListComponent },
      { path: 'near-transport-provider/:id', component: NearProviderComponent },
      {
        path: 'near-delivery-provider/:id',
        component: NearDeliveryProviderComponent,
      },
      {
        path: 'notes/:id/create',
        component: ProviderNotesCrudComponent,
        data: { mode: FormMode.Create },
      },
      {
        path: 'acceptance-report',
        component: ProviderAcceptanceReportComponent,
      },
      {
        path: 'driver-order/:id',
        component: ProviderOrdersComponent,
      },
      {
        path: 'files',
        component: FilesComponent,
      },
      {
        path: 'drivers-open-registration',
        component: DriversOpenRegistrationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProviderRoutingModule {}
