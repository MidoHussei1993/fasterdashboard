import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
// import { WidgetsModule } from '../../_metronic/partials';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProviderModule } from '../provider/provider.module';
import { TrackingxProvidersComponent } from './tracking-providers/tracking-providers.component';

@NgModule({
  declarations: [DashboardComponent, TrackingxProvidersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
    // WidgetsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    // ProviderModule,
  ],
})
export class DashboardModule {}
