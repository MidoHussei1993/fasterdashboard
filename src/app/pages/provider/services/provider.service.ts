import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { List, Dropdown } from 'src/app/shared';
import {
  ProviderFilter,
  ProviderList,
  ProviderNotesFilter,
  WorkTimeReportFilter,
} from '../models';
import * as moment from 'moment';

const API = END_POINTS.Provider;

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  constructor(private http: HttpClient) {}

  get(filter: ProviderFilter): Observable<List<ProviderList>> {
    return this.http.get<List<ProviderList>>(API.search, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.IsActive && { IsActive: filter.IsActive }),
        ...(filter.ProviderFullName && {
          ProviderFullName: filter.ProviderFullName,
        }),
        ...(filter.Gender != null && { Gender: filter.Gender }),
        ...(filter.IdentificationNumber && {
          IdentificationNumber: filter.IdentificationNumber,
        }),
        ...(filter.ProviderId && { ProviderId: filter.ProviderId }),
        ...(filter.phoneNumber && { phoneNumber: filter.phoneNumber }),
        ...(filter.Registertype && { Registertype: filter.Registertype }),
        ...(filter.Statues && { Statues: filter.Statues }),
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
        ...(filter.VendorId && { VendorId: filter.VendorId }),
        ...(filter.NationalityId && { NationalityId: filter.NationalityId }),
        ...(filter.VendorId && { VendorId: filter.VendorId }),
        ...(filter.CityId && { CityId: filter.CityId }),
        ...(filter.parentProviderId && {
          parentProviderId: filter.parentProviderId,
        }),
      },
    });
  }

  getByID(id: number): Observable<any> {
    return this.http.get<any>(API.getById + id);
  }

  getDropdown(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.getDropdown);
  }

  getCarColors(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.carColor);
  }

  getProviderWorkTimeReport(
    id,
    filter: WorkTimeReportFilter
  ): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.getProviderWorkTimeReport(id), {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.ProviderId && { ProviderId: filter.ProviderId }),
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

  BusyProvidersInDeliveryOrders(
    filter: ProviderFilter
  ): Observable<List<ProviderList>> {
    return this.http.get<List<ProviderList>>(
      API.BusyProvidersInDeliveryOrders,
      {
        params: {
          ...(filter.PageSize && { PageSize: filter.PageSize }),
          ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
          ...(filter.IsActive && { IsActive: filter.IsActive }),
          ...(filter.ProviderFullName && {
            ProviderFullName: filter.ProviderFullName,
          }),
          ...(filter.Gender && { Gender: filter.Gender }),
          ...(filter.IdentificationNumber && {
            IdentificationNumber: filter.IdentificationNumber,
          }),
          ...(filter.ProviderId && { ProviderId: filter.ProviderId }),
          ...(filter.Registertype && { Registertype: filter.Registertype }),
          ...(filter.Statues && { Statues: filter.Statues }),
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
          ...(filter.VendorId && { VendorId: filter.VendorId }),
          ...(filter.phoneNumber && { phoneNumber: filter.phoneNumber }),
        },
      }
    );
  }
  BusyProvidersInTransportOrders(
    filter: ProviderFilter
  ): Observable<List<ProviderList>> {
    return this.http.get<List<ProviderList>>(
      API.BusyProvidersInTransportOrders,
      {
        params: {
          ...(filter.PageSize && { PageSize: filter.PageSize }),
          ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
          ...(filter.IsActive && { IsActive: filter.IsActive }),
          ...(filter.ProviderFullName && {
            ProviderFullName: filter.ProviderFullName,
          }),
          ...(filter.Gender && { Gender: filter.Gender }),
          ...(filter.IdentificationNumber && {
            IdentificationNumber: filter.IdentificationNumber,
          }),
          ...(filter.ProviderId && { ProviderId: filter.ProviderId }),
          ...(filter.Registertype && { Registertype: filter.Registertype }),
          ...(filter.Statues && { Statues: filter.Statues }),
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
          ...(filter.VendorId && { VendorId: filter.VendorId }),
          ...(filter.phoneNumber && { phoneNumber: filter.phoneNumber }),
        },
      }
    );
  }
  ProvidersHaveOneOrderAtLeast(
    filter: ProviderFilter
  ): Observable<List<ProviderList>> {
    return this.http.get<List<ProviderList>>(API.ProvidersHaveOneOrderAtLeast, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.IsActive && { IsActive: filter.IsActive }),
        ...(filter.ProviderFullName && {
          ProviderFullName: filter.ProviderFullName,
        }),
        ...(filter.Gender && { Gender: filter.Gender }),
        ...(filter.IdentificationNumber && {
          IdentificationNumber: filter.IdentificationNumber,
        }),
        ...(filter.ProviderId && { ProviderId: filter.ProviderId }),
        ...(filter.Registertype && { Registertype: filter.Registertype }),
        ...(filter.Statues && { Statues: filter.Statues }),
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
        ...(filter.VendorId && { VendorId: filter.VendorId }),
        ...(filter.phoneNumber && { phoneNumber: filter.phoneNumber }),
      },
    });
  }

  getProviderNotes(
    providerId: number,
    filter: ProviderNotesFilter
  ): Observable<any> {
    return this.http.get<any>(API.providerNotes(providerId), {
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

  createProviderNotes(body: any): Observable<any> {
    return this.http.post<any>(API.createProviderNotes, body);
  }

  getNationality(): Observable<any> {
    return this.http.get<any>(API.Nationality);
  }

  GetProviderOrderRejectPercentage(body: any): Observable<any> {
    return this.http.post<any>(API.GetProviderOrderRejectPercentage, body);
  }

  getBankList(): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(API.bankDropdown);
  }

  getProviderAcceptanceReport(
    VendorId: any,
    filter: {
      StartDate: string;
      EndDate: string;
    }
  ): Observable<List<any>> {
    return this.http.get<List<any>>(API.getProviderAcceptanceReport(VendorId), {
      params: {
        ...(filter.StartDate && {
          StartDate: String(
            moment(filter.StartDate).format('YYYY-MM-DD HH:mm:ss')
          ),
        }),
        ...(filter.EndDate && {
          EndDate: String(moment(filter.EndDate).format('YYYY-MM-DD HH:mm:ss')),
        }),
      },
    });
  }

  getDriversOpenRegistration(): Observable<any> {
    return this.http.get<any>(
      'https://faster-5dd74.firebaseio.com/Phone.json',
      {
        headers: {
          // 'Authorization':null
        },
      }
    );
  }

  sendToken(id: string): Observable<any> {
    return this.http.get<any>(API.sendToken(id));
  }
  sendToMeLink(id: string): Observable<any> {
    return this.http.get<any>(API.sendToMeLink(id));
  }

  getMapProviders(deliveryOrderStatusesEnums?: any[]): Observable<any> {
    console.log(
      '🚀 ~ file: provider.service.ts:279 ~ ProviderService ~ getMapProviders ~ deliveryOrderStatusesEnums:',
      deliveryOrderStatusesEnums
    );
    return this.http.get<any>(API.getMapProviders, {
      params: {
        ...(deliveryOrderStatusesEnums && {
          deliveryOrderStatusesEnums: deliveryOrderStatusesEnums,
        }),
      },
    });
  }
}
