import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CustomersComponent } from './customers/customers.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ProviderCrudComponent } from './providers/provider-crud/provider-crud.component';
import { ProvidersComponent } from './providers/providers.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { UserRolesComponent } from './users/user-roles/user-roles.component';
import { UsersComponent } from './users/users.component';
import { UserCrudComponent } from './users/user-crud/user-crud.component';
import { CustomerNoteComponent } from './customers/customer-note/customer-note.component';
import { CustomerWalletComponent } from './customers/customer-wallet/customer-wallet.component';
import { PriviledgeComponent } from './users/priviledge/priviledge.component';
import { AcceptanceRateComponent } from './providers/acceptance-rate/acceptance-rate.component';
import { CustomerAdressesComponent } from './customer-adresses/customer-adresses.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: UsersComponent },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'users/view/:id',
        component: UserCrudComponent,
        data: { mode: FormMode.View },
      },
      {
        path: 'users/priviledge/:id',
        component: PriviledgeComponent ,
        data: { mode: FormMode.View },
      },
      {
        path: 'users/create',
        component: UserCrudComponent,
        data: { mode: FormMode.Create },
      },
      {
        path: 'user-roles/:id',
        component: UserRolesComponent,
      },
      {
        path: 'providers',
        component: ProvidersComponent,
      },
      {
        path: 'providers/create',
        component: ProviderCrudComponent,
        data: { mode: FormMode.Create },
      },
      {
        path: 'providers/edit/:id',
        component: ProviderCrudComponent,
        data: { mode: FormMode.Edit },
      },
      {
        path: 'providers/view/:id',
        component: ProviderCrudComponent,
        data: { mode: FormMode.View },
      },
      { path: 'customers', component: CustomersComponent },
      {
        path: 'customers/notes/:id',
        component: CustomerNoteComponent,
        data: { mode: FormMode.Create },
      },
      {
        path: 'customers/wallet/:id',
        component: CustomerWalletComponent,
        data: { mode: FormMode.Create },
      },
      { path: 'my-profile', component: MyProfileComponent },
      {
        path: 'change_Password',
        component: ChangePasswordComponent,
        data: { mode: FormMode.Create },
      },
      {
        path: 'reset-password/:id',
        component: ResetpasswordComponent,
        data: { mode: FormMode.Create },
      },
      {
        path: 'forget_Password',
        component: ForgetpasswordComponent,
        data: { mode: FormMode.Create },
      },
      {
        path: 'providers/acceptance-rate/:id',
        component: AcceptanceRateComponent,
      },
      {
        path: 'customer-adresses',
        component: CustomerAdressesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdentityRoutingModule {}
