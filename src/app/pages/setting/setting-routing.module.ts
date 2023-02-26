import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './setting/setting.component';
import { UserActionTrackingComponent } from './user-action-tracking/user-action-tracking.component';

const routes: Routes = [
  {
    path: '',
    component: SettingComponent,
  },
  {
    path: 'user-action-tracking/:id',
    component: UserActionTrackingComponent,
  },
  {
    path: 'user-action-tracking',
    component: UserActionTrackingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
