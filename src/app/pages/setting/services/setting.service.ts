import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { List } from 'src/app/shared';
import {
  Prices,
  SocialMedia,
  TermPolicies,
  UserTrackingActionFilter,
  Version,
} from '../models';

const API = END_POINTS.App;

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  constructor(private http: HttpClient) {}

  BackupDB(): Observable<Prices> {
    return this.http.get<Prices>(API.BackupDB);
  }

  GetPrices(): Observable<Prices> {
    return this.http.get<Prices>(API.GetPrices);
  }

  UpdatePrices(prices: Prices): Observable<Prices> {
    return this.http.put<Prices>(API.UpdatePrices, prices);
  }

  GetSocialMedia(): Observable<SocialMedia> {
    return this.http.get<SocialMedia>(API.GetSocialMedia);
  }
  GetRadius(): Observable<any> {
    return this.http.get<any>(API.GetRadius);
  }
  UpdateSocialMedia(socialMedia: SocialMedia): Observable<SocialMedia> {
    return this.http.put<SocialMedia>(API.UpdateSocialMedia, socialMedia);
  }

  GetTermsAndPolicies(): Observable<TermPolicies> {
    return this.http.get<TermPolicies>(API.GetTermsAndPolicies);
  }
  UpdateTermsAndPolicies(model: TermPolicies): Observable<TermPolicies> {
    return this.http.put<TermPolicies>(API.UpdateTermsAndPolicies, model);
  }

  GetVersion(): Observable<Version> {
    return this.http.get<Version>(API.GetVersion);
  }
  UpdateVersion(version: Version): Observable<Version> {
    return this.http.put<Version>(API.UpdateVersion, version);
  }

  UpdateRadius(version: any): Observable<any> {
    return this.http.put<any>(API.UpdateRadius, version);
  }

  // --------------------VAT----------------------------------------------------------------
  GetVat(): Observable<any> {
    return this.http.get<any>(API.GetVat);
  }
  UpdateVat(body: any): Observable<any> {
    return this.http.put<any>(API.UpdateVat, body);
  }
  // --------------------Scheduling----------------------------------------------------------------
  GetSchedulingInMinutes(): Observable<any> {
    return this.http.get<any>(API.GetSchedulingInMinutes);
  }
  UpdateSchedulingInMinutes(body: any): Observable<any> {
    return this.http.put<any>(API.UpdateSchedulingInMinutesDto, body);
  }
  // --------------------Bonus----------------------------------------------------------------
  GetBonusData(): Observable<any> {
    return this.http.get<any>(API.GetBonusData);
  }
  UpdateBonusData(body: any): Observable<any> {
    return this.http.put<any>(API.UpdateBonusData, body);
  }
  // --------------------ProviderReciveOneOrder----------------------------------------------------------------
  getProviderReciveOneOrder(): Observable<any> {
    return this.http.get<any>(API.getProviderReciveOneOrder);
  }
  UpdateProviderReciveOneOrder(body: any): Observable<any> {
    return this.http.put<any>(API.UpdateProviderReciveOneOrder, body);
  }
  getUserTrackingActions(
    filter: UserTrackingActionFilter
  ): Observable<List<any>> {
    return this.http.get<List<any>>(API.UserActionTracking, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.StringUserId && { StringUserId: filter.StringUserId }),
        ...(filter.Note && { Note: filter.Note }),
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
  // --------------------Bonus----------------------------------------------------------------
  getLimitationOrderValue(): Observable<any> {
    return this.http.get<any>(API.getLimitationOrderValue);
  }
  updateLimitationOrderValue(body: any): Observable<any> {
    return this.http.put<any>(API.updateLimitationOrderValue, body);
  }

  // --------------------dispatch----------------------------------------------------------------
  getDispatchSystemDDL(): Observable<any> {
    return this.http.get<any>(API.getDispatchSystemDDL);
  }
  UpdateDispatchSystem(body: any): Observable<any> {
    return this.http.put<any>(API.UpdateDispatchSystem, body);
  }
  getDispatchSystem(): Observable<any> {
    return this.http.get<any>(API.getDispatchSystem);
  }

  getPaymentGatewaysDDL(): Observable<any> {
    return this.http.get<any>(API.GetPaymentGatewaysDDL);
  }
}
