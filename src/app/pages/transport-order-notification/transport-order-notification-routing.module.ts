import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { TransportOrderNotificationCrudComponent } from './transport-order-notification-crud/transport-order-notification-crud.component';
import { TransportOrderNotificationListComponent } from './transport-order-notification-list/transport-order-notification-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: TransportOrderNotificationListComponent },
      {
        path: 'create',
       component: TransportOrderNotificationCrudComponent, 
       data: {mode: FormMode.Create}
       },
      { path: 'edit/:id',
       component: TransportOrderNotificationCrudComponent , 
       data: {mode: FormMode.Edit}
      },
      { path: 'view/:id',
       component: TransportOrderNotificationCrudComponent , 
       data: {mode: FormMode.View}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportOrderNotificationRoutingModule { }
