import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoyaserRoutingModule } from './moyaser-routing.module';
import { MoyaserListComponent } from './moyaser-list/moyaser-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MoyaserListComponent],
  imports: [
    CommonModule,
    MoyaserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class MoyaserModule {}
