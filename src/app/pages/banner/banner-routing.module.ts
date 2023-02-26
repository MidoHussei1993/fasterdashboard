import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { BannerCrudComponent } from './banner-crud/banner-crud.component';
import { BannerListComponent } from './banner-list/banner-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: BannerListComponent },
      { 
        path: 'create',
       component: BannerCrudComponent, 
       data: {mode: FormMode.Create}
       },
      { path: 'edit/:id',
       component: BannerCrudComponent , 
       data: {mode: FormMode.Edit}
      },
      { path: 'view/:id',
       component: BannerCrudComponent , 
       data: {mode: FormMode.View}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannerRoutingModule { }
