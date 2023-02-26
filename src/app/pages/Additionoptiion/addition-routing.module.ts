import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { AdditionListComponent } from './Addition-list/addition-list.component';
import { AdditionoptionCrudComponent } from './Additionoptiion-crud/Additionoptiion-crud.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: AdditionListComponent },
      {
        path: 'create',
       component: AdditionoptionCrudComponent,
       data: {type: FormMode.Create}
       },
      { path: 'edit/:id',
       component: AdditionoptionCrudComponent ,
       data: {type: FormMode.Edit}
      },
      { path: 'view/:id',
       component: AdditionoptionCrudComponent ,
       data: {type: FormMode.View}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdditionRoutingModule {}
