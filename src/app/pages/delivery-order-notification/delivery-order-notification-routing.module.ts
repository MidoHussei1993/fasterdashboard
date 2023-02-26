import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { DeliveryOrderNotificationCrudComponent } from './delivery-order-notification-crud/delivery-order-notification-crud.component';
import { DeliveryOrderNotificationListComponent } from './delivery-order-notification-list/delivery-order-notification-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: DeliveryOrderNotificationListComponent },
      {
        path: 'create',
       component: DeliveryOrderNotificationCrudComponent, 
       data: {mode: FormMode.Create}
       },
      { path: 'edit/:id',
       component: DeliveryOrderNotificationCrudComponent , 
       data: {mode: FormMode.Edit}
      },
      { path: 'view/:id',
       component: DeliveryOrderNotificationCrudComponent , 
       data: {mode: FormMode.View}
      }
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryOrderNotificationRoutingModule { }
