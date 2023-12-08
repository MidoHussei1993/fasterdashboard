import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoyaserListComponent } from './moyaser-list/moyaser-list.component';

const routes: Routes = [
  {
    path: '',
    children: [{ path: '', component: MoyaserListComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoyaserRoutingModule {}
