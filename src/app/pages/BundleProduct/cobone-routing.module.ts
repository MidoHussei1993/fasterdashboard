import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { CoboneCrudComponent } from './cobone-crud/cobone-crud.component';
import { CoboneListComponent } from './cobone-list/cobone-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CoboneListComponent },
      {
        path: 'create',
       component: CoboneCrudComponent,
       data: {type: FormMode.Create}
       },
      { path: 'edit/:id',
       component: CoboneCrudComponent ,
       data: {type: FormMode.Edit}
      },
      { path: 'view/:id',
       component: CoboneCrudComponent ,
       data: {type: FormMode.View}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoboneRoutingModule {}
