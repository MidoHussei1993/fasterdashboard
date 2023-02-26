import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { NotificationCrudComponent } from './notification-crud/notification-crud.component';
import { NotificationListComponent } from './notification-list/notification-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: NotificationListComponent },
      {
        path: 'create',
       component: NotificationCrudComponent, 
       data: {mode: FormMode.Create}
       },
      { path: 'edit/:id',
       component: NotificationCrudComponent , 
       data: {mode: FormMode.Edit}
      },
      { path: 'view/:id',
       component: NotificationCrudComponent , 
       data: {mode: FormMode.View}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
