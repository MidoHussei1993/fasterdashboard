import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { Dropdown, List, SingleItemResponse } from 'src/app/shared';
import {
  Customer,
  IdentityFilter,
  Profile,
  ProviderIdentity,
  ProviderIdentityItem,
  Role,
  User,
  UserFilter,
  UserRoles,
} from '../models';
import { ChangePassword } from '../models/changepsssword.model';
import { ForgetPassword } from '../models/forgetPAssword.model';
import { ResetPassword } from '../models/resetPassword.model';
import { TranslateService } from '@ngx-translate/core';

const API = END_POINTS.Identity;
export interface IList<T> {
  apiStatusCode: number;
  errorMessage: string;
  isSucceeded: boolean;
  returnData: List<T>;
}

const password = END_POINTS.Identity;
type DashboardUserProfile = {
  phoneNumber: String;
  fullName: String;
};

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  constructor(private http: HttpClient, private translate: TranslateService) {}

  getUsers(filter: UserFilter): Observable<IList<User>> {
    return this.http.get<IList<User>>(API.getUsers, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.Email && { Email: filter.Email }),
        ...(filter.FullName && { FullName: filter.FullName }),
        ...(filter.IdentificationNumber && {
          IdentificationNumber: filter.IdentificationNumber,
        }),
        ...(filter.PhoneNumber && { PhoneNumber: filter.PhoneNumber }),
        ...(filter.CreateAtFrom && {
          CreateAtFrom: String(
            moment(filter.CreateAtFrom).format('YYYY-MM-DD HH:mm:ss')
          ),
        }),
        ...(filter.CreateAtTo && {
          CreateAtTo: String(
            moment(filter.CreateAtTo).format('YYYY-MM-DD HH:mm:ss')
          ),
        }),
      },
    });
  }

  getCustomers(filter: IdentityFilter): Observable<IList<Customer>> {
    return this.http.get<IList<Customer>>(API.getCustomers, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.CreateAtFrom && {
          CreateAtFrom: String(
            moment(filter.CreateAtFrom).format('YYYY-MM-DD HH:mm:ss')
          ),
        }),
        ...(filter.CreateAtTo && {
          CreateAtTo: String(
            moment(filter.CreateAtTo).format('YYYY-MM-DD HH:mm:ss')
          ),
        }),
      },
    });
  }

  getProfile(): Observable<SingleItemResponse<Profile>> {
    return this.http.get<SingleItemResponse<Profile>>(API.getProfile);
  }

  updateProfileImage(file: any): Observable<IList<ProviderIdentity>> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<IList<ProviderIdentity>>(
      API.updateProfileImage,
      formData
    );
  }

  createDashboardUser(body: any): Observable<any> {
    return this.http.put<any>(API.createDashboardUser, body);
  }
  updateDashBoardUserProfile(
    body: DashboardUserProfile
  ): Observable<IList<any>> {
    return this.http.put<IList<any>>(API.updateDashBoardUserProfile, body);
  }

  setUserActive(userId: string): Observable<any> {
    return this.http.post<any>(API.setUserActive(userId), {});
  }

  setUserDeActive(userId: string): Observable<any> {
    return this.http.post<any>(API.setUserDeActive(userId), {});
  }

  getUserRoles(userId: string): Observable<SingleItemResponse<string[]>> {
    return this.http.get<SingleItemResponse<string[]>>(
      API.getUserRoles(userId)
    );
  }
  getProviderRigesterTypeDDL(): Observable<any> {
    return this.http.get<any>(API.getProviderRigesterTypeDDL);
  }

  getExistRoles(): Observable<SingleItemResponse<Role[]>> {
    return this.http.get<SingleItemResponse<Role[]>>(API.getExistRoles);
  }

  updateUserRoles(body: UserRoles): Observable<SingleItemResponse<Role[]>> {
    return this.http.post<SingleItemResponse<Role[]>>(
      API.updateUserRoles,
      body
    );
  }

  // TODO: PROVIDER
  getProviders(filter: IdentityFilter): Observable<IList<ProviderIdentity>> {
    return this.http.get<IList<ProviderIdentity>>(API.getProviders, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.typeEnum && { typeEnum: filter.typeEnum }),
        ...(filter.CreateAtFrom && {
          CreateAtFrom: String(
            moment(filter.CreateAtFrom).format('YYYY-MM-DD HH:mm:ss')
          ),
        }),
        ...(filter.CreateAtTo && {
          CreateAtTo: String(
            moment(filter.CreateAtTo).format('YYYY-MM-DD HH:mm:ss')
          ),
        }),
      },
    });
  }
  getFullProviderProfile(
    userId: string
  ): Observable<SingleItemResponse<ProviderIdentityItem>> {
    return this.http.get<SingleItemResponse<ProviderIdentityItem>>(
      API.getFullProviderProfile(userId)
    );
  }
  updateProvider(
    userId: string,
    body: ProviderIdentity
  ): Observable<IList<ProviderIdentity>> {
    return this.http.put<IList<ProviderIdentity>>(
      API.updateProvider(userId),
      body
    );
  }

  changeUserActivate(id: string): Observable<any> {
    return this.http.post<any>(API.changeUserActivate(id), {});
  }
  approveProvider(id: string): Observable<any> {
    return this.http.post<any>(API.approveProvider(id), {});
  }
  uploadImage(file: any): Observable<SingleItemResponse<{ response: string }>> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<SingleItemResponse<{ response: string }>>(
      API.uploadImage,
      formData
    );
  }

  changePassword(model: ChangePassword): Observable<any> {
    return this.http.post<any>(password.password, model);
  }

  ResetPassword(model: ResetPassword): Observable<any> {
    return this.http.post<any>(password.reset, model);
  }
  NewPassword(model: ResetPassword): Observable<any> {
    return this.http.post<any>(password.newPass, model);
  }

  ForgetPassword(model: ForgetPassword): Observable<any> {
    return this.http.post<any>(password.forgetPassword, model);
  }

  getOTP(email: string): Observable<any> {
    return this.http.get<any>(password.forgetPassword + `/${email}`);
  }
  sendOTP(body: any): Observable<any> {
    return this.http.post<any>(password.forgetPassword, body);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(API.getUserById(userId));
  }

  createProvider(body: any): Observable<any> {
    return this.http.post<any>(API.createProvider, body);
  }
  createProviderForPublic(body: any): Observable<any> {
    return this.http.put<any>(
      'https://api.faster.sa:5000/api/provider/identity/register',
      body
    );
  }

  GetPaymentTypesDDL(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.GetPaymentTypesDDL);
  }

  getPriviledge(userId): Observable<any> {
    return this.http.get<any>(API.getPriviledge(userId));
  }

  addUserPrivileges(userId, privilegeId): Observable<any> {
    return this.http.post<any>(API.addUserPrivileges(userId, privilegeId), {});
  }

  ChangeUserPrivilegesStatus(userId, privilegeId): Observable<any> {
    return this.http.post<any>(
      API.ChangeUserPrivilegesStatus(userId, privilegeId),
      {}
    );
  }

  updateFirebaseToken(token: string): Observable<any> {
    return this.http.put<any>(API.updateFirebaseToken, {
      token: token,
      favoriteLanguage: this.translate.currentLang,
      frontEndDevice: 'dashboard',
    });
  }
}
