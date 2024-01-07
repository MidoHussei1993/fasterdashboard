import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdentityRoutingModule } from './identity-routing.module';
import { UsersComponent } from './users/users.component';
import { CustomersComponent } from './customers/customers.component';
import { ProvidersComponent } from './providers/providers.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserRolesComponent } from './users/user-roles/user-roles.component';
import { ProviderCrudComponent } from './providers/provider-crud/provider-crud.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserCrudComponent } from './users/user-crud/user-crud.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { CustomerNoteComponent } from './customers/customer-note/customer-note.component';
import { CustomerWalletComponent } from './customers/customer-wallet/customer-wallet.component';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { PriviledgeComponent } from './users/priviledge/priviledge.component';
import { AcceptanceRateComponent } from './providers/acceptance-rate/acceptance-rate.component';
import { ProviderModule } from '../provider/provider.module';
import { CustomerAdressesComponent } from './customer-adresses/customer-adresses.component';
import { RefundRequestSearchComponent } from './refund-request-search/refund-request-search.component';

@NgModule({
  declarations: [
    UsersComponent,
    CustomersComponent,
    ProvidersComponent,
    UserRolesComponent,
    ProviderCrudComponent,
    MyProfileComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    ChangePasswordComponent,
    UserCrudComponent,
    CustomerNoteComponent,
    CustomerWalletComponent,
    PriviledgeComponent,
    AcceptanceRateComponent,
    CustomerAdressesComponent,
    RefundRequestSearchComponent,
  ],
  imports: [
    CommonModule,
    IdentityRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxEchartsModule,
    TabViewModule,
    CalendarModule,
    ProviderModule,
  ],
})
export class IdentityModule {}
