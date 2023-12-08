import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { Dropdown, List } from 'src/app/shared/models';
import { ListProfit } from 'src/app/shared/models/listProfirt';
import {
  AddedFromPaymentReportFilter,
  AllProvidersWorkingTimeReport,
  AllProvidersWorkingTimeReportFilter,
  CustomerWalletManualAdditionReport,
  CustomerWalletReportFilter,
  DeliveryOrderFilter,
  IgnoredOrderFilter,
  OrderReport,
  OrderReportFilter,
  ProviderCount,
  ProviderWalletManualAdditionReport,
  ProviderWalletReportFilter,
  RewardCompensationFilter,
  ShopProfitReportFilter,
  TaxsReport,
  TaxsReportFilter,
} from '../model';
import { CoboneReport } from '../model/cobone-report.model';
import { CoboneTransportFilter } from '../model/cobone-transport-filter.model';
import { CoboneFilter } from '../model/cobonefilter.model';
import { CoboneTrasport } from '../model/cobonetrasport.model';
import { CustomerOrderStatusReportFilter } from '../model/CustomerOrderStatusReport-filter.model';
import { CustomerOrderStatusReport } from '../model/CustomerOrderStatusReport.model';
import { OrderFilter } from '../model/deliverOrderStatusFilter.model';
import { DeliveryOrderStatus } from '../model/deliveryOrder-status.model';
import { ShopFilter } from '../model/shop-filter.model';
import { ShopResturant } from '../model/shop.model';
import { Subscription } from '../model/Subscription.model';
import { TransportStatusOrderFilter } from '../model/trasportOrderfilter.model';
import * as moment from 'moment';

const API = END_POINTS.Report;

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private http: HttpClient) {}

  get(filter: CoboneFilter): Observable<List<CoboneReport>> {
    return this.http.get<List<CoboneReport>>(API.CoponeReport, {
      params: {
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.IsActive && { IsActive: filter.IsActive }),
        ...(filter.ShopId && { CreateAtTo: String(filter.ShopId) }),
        ...(filter.StartDate && {
          StartDate: String(
            moment(filter.StartDate).format('YYYY-MM-DD HH:mm:ss')
          ),
        }),
        ...(filter.EndDate && {
          EndDate: String(moment(filter.EndDate).format('YYYY-MM-DD HH:mm:ss')),
        }),
        ...(filter.CoboneCod && { CreateAtTo: String(filter.CoboneCod) }),
      },
    });
  }

  getcobonetrasport(
    id: number,
    filter: CoboneTransportFilter
  ): Observable<List<CoboneTrasport>> {
    return this.http.get<List<CoboneTrasport>>(
      API.CoponeTransportDetailsReport + `/${id}`,
      {
        params: {
          ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
          ...(filter.PageSize && { PageSize: filter.PageSize }),
          ...(filter.CoboneId && { CreateAtTo: String(filter.CoboneId) }),
          ...(filter.StartDate && {
            StartDate: String(
              moment(filter.StartDate).format('YYYY-MM-DD HH:mm:ss')
            ),
          }),
          ...(filter.EndDate && {
            EndDate: String(
              moment(filter.EndDate).format('YYYY-MM-DD HH:mm:ss')
            ),
          }),
        },
      }
    );
  }

  getcobonedelivery(
    id: number,
    filter: CoboneTransportFilter
  ): Observable<List<CoboneTrasport>> {
    return this.http.get<List<CoboneTrasport>>(
      API.CoponeDeliveryDetailsReport + `/${id}`,
      {
        params: {
          ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
          ...(filter.PageSize && { PageSize: filter.PageSize }),
          ...(filter.CoboneId && { CreateAtTo: String(filter.CoboneId) }),
          ...(filter.StartDate && {
            StartDate: String(
              moment(filter.StartDate).format('YYYY-MM-DD HH:mm:ss')
            ),
          }),
          ...(filter.EndDate && {
            EndDate: String(
              moment(filter.EndDate).format('YYYY-MM-DD HH:mm:ss')
            ),
          }),
        },
      }
    );
  }

  transportorderStatus(
    StatusId: number,
    filter: TransportStatusOrderFilter
  ): Observable<List<CoboneTrasport>> {
    return this.http.get<List<CoboneTrasport>>(
      API.TransportOrderStatusDetailsReport + `/${StatusId}`,
      {
        params: {
          ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
          ...(filter.PageSize && { PageSize: filter.PageSize }),
          ...(filter.StatusId && { CreateAtTo: String(filter.StatusId) }),
          ...(filter.TypeId && { CreateAtTo: String(filter.TypeId) }),
          ...(filter.CustomerId && { CreateAtTo: String(filter.CustomerId) }),
          ...(filter.StartDate && {
            StartDate: String(
              moment(filter.StartDate).format('YYYY-MM-DD HH:mm:ss')
            ),
          }),
          ...(filter.EndDate && {
            EndDate: String(
              moment(filter.EndDate).format('YYYY-MM-DD HH:mm:ss')
            ),
          }),
        },
      }
    );
  }

  deliveryorderStatus(
    StatusId: number,
    filter: TransportStatusOrderFilter
  ): Observable<List<CoboneTrasport>> {
    return this.http.get<List<CoboneTrasport>>(
      API.DeliveryOrderStatusDetailsReport + `/${StatusId}`,
      {
        params: {
          ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
          ...(filter.PageSize && { PageSize: filter.PageSize }),
          ...(filter.StatusId && { CreateAtTo: String(filter.StatusId) }),
          ...(filter.TypeId && { CreateAtTo: String(filter.TypeId) }),
          ...(filter.CustomerId && { CreateAtTo: String(filter.CustomerId) }),
          ...(filter.StartDate && {
            StartDate: String(
              moment(filter.StartDate).format('YYYY-MM-DD HH:mm:ss')
            ),
          }),
          ...(filter.EndDate && {
            EndDate: String(
              moment(filter.EndDate).format('YYYY-MM-DD HH:mm:ss')
            ),
          }),
        },
      }
    );
  }

  DeliveryOrderStatusReport(
    filter: OrderFilter
  ): Observable<List<DeliveryOrderStatus>> {
    return this.http.get<List<DeliveryOrderStatus>>(
      API.DeliveryOrderStatusReport,
      {
        params: {
          ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
          ...(filter.PageSize && { PageSize: filter.PageSize }),
          ...(filter.ProviderId && { CreateAtTo: String(filter.ProviderId) }),
          ...(filter.CustomerId && { CreateAtTo: String(filter.CustomerId) }),

          ...(filter.StatusId && { CreateAtTo: String(filter.StatusId) }),
          ...(filter.StartDate && {
            StartDate: String(
              moment(filter.StartDate).format('YYYY-MM-DD HH:mm:ss')
            ),
          }),
          ...(filter.EndDate && {
            EndDate: String(
              moment(filter.EndDate).format('YYYY-MM-DD HH:mm:ss')
            ),
          }),
        },
      }
    );
  }
  TransportOrderStatusReport(
    filter: OrderFilter
  ): Observable<List<DeliveryOrderStatus>> {
    return this.http.get<List<DeliveryOrderStatus>>(
      API.TransportOrderStatusReport,
      {
        params: {
          ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
          ...(filter.PageSize && { PageSize: filter.PageSize }),
          ...(filter.ProviderId && { CreateAtTo: String(filter.ProviderId) }),
          ...(filter.CustomerId && { CreateAtTo: String(filter.CustomerId) }),

          ...(filter.StatusId && { CreateAtTo: String(filter.StatusId) }),
          ...(filter.StartDate && {
            StartDate: String(
              moment(filter.StartDate).format('YYYY-MM-DD HH:mm:ss')
            ),
          }),
          ...(filter.EndDate && {
            EndDate: String(
              moment(filter.EndDate).format('YYYY-MM-DD HH:mm:ss')
            ),
          }),
        },
      }
    );
  }

  ShopAndResturant(filter: ShopFilter): Observable<List<ShopResturant>> {
    return this.http.get<List<ShopResturant>>(API.ShopOrdersCountReport, {
      params: {
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.ShopId && { CreateAtTo: String(filter.ShopId) }),
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
  Subscription(filter: ShopFilter): Observable<ListProfit<Subscription>> {
    return this.http.get<ListProfit<Subscription>>(
      API.SubscriptionsProfitsReport,
      {
        params: {
          ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
          ...(filter.PageSize && { PageSize: filter.PageSize }),
          ...(filter.ShopId && { CreateAtTo: String(filter.ShopId) }),
          ...(filter.StartDate && {
            StartDate: String(
              moment(filter.StartDate).format('YYYY-MM-DD HH:mm:ss')
            ),
          }),
          ...(filter.EndDate && {
            EndDate: String(
              moment(filter.EndDate).format('YYYY-MM-DD HH:mm:ss')
            ),
          }),
        },
      }
    );
  }

  getProviderCountsReport(VendorId?): Observable<ProviderCount> {
    return this.http.get<ProviderCount>(API.ProviderCountsReport, {
      params: {
        ...(VendorId && { VendorId: VendorId }),
      },
    });
  }

  ActiveProviderCount(): Observable<List<number>> {
    return this.http.get<List<any>>(API.ActiveProviderCount);
  }
  NotActiveProviderCount(): Observable<List<any>> {
    return this.http.get<List<any>>(API.NotActiveProviderCount);
  }

  TransportOrderDataReport(
    filter: OrderReportFilter
  ): Observable<List<OrderReport>> {
    return this.http.get<List<OrderReport>>(API.TransportOrderDataReport, {
      params: {
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.Id && { Id: filter.Id }),
        ...(filter.ShopId && { ShopId: filter.ShopId }),
        ...(filter.PayTypeId && { PayTypeId: filter.PayTypeId }),
        ...(filter.StatusId && { StatusId: filter.StatusId }),
        ...(filter.VendorId && { VendorId: filter.VendorId }),
        ...(filter.CustomerId && { CustomerId: filter.CustomerId }),
        ...(filter.OrderType && { OrderType: filter.OrderType }),
        ...(filter.CustomerPhone && { CustomerPhone: filter.CustomerPhone }),
        ...(filter.ProviderPhone && { ProviderPhone: filter.ProviderPhone }),
        ...(filter.ProviderId && { ProviderId: filter.ProviderId }),
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
  DeliveryOrderDataReport(
    filter: OrderReportFilter
  ): Observable<List<OrderReport>> {
    return this.http.get<List<OrderReport>>(API.DeliveryOrderDataReport, {
      params: {
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.Id && { Id: filter.Id }),
        ...(filter.ShopId && { ShopId: filter.ShopId }),
        ...(filter.PayTypeId && { PayTypeId: filter.PayTypeId }),
        ...(filter.StatusId && { StatusId: filter.StatusId }),
        ...(filter.VendorId && { VendorId: filter.VendorId }),
        ...(filter.CustomerId && { CustomerId: filter.CustomerId }),
        ...(filter.CustomerPhone && { CustomerPhone: filter.CustomerPhone }),
        ...(filter.ProviderPhone && { ProviderPhone: filter.ProviderPhone }),
        ...(filter.ProviderId && { ProviderId: filter.ProviderId }),
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

  DeliveryOrderDetailsDataReport(id): Observable<OrderReport> {
    return this.http.get<OrderReport>(API.DeliveryOrderDetailsDataReport(id));
  }
  TransportOrderDetailsDataReport(id): Observable<OrderReport> {
    return this.http.get<OrderReport>(API.TransportOrderDetailsDataReport(id));
  }

  TaxsReport(filter: TaxsReportFilter): Observable<List<TaxsReport>> {
    return this.http.get<List<TaxsReport>>(API.TaxsReport, {
      params: {
        ...(filter.StartDate && {
          StartDate: String(
            moment(filter.StartDate).format('YYYY-MM-DD HH:mm:ss')
          ),
        }),
        ...(filter.EndDate && {
          EndDate: String(moment(filter.EndDate).format('YYYY-MM-DD HH:mm:ss')),
        }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.PageSize && { PageSize: filter.PageSize }),
      },
    });
  }

  CustomerOrderStatusReport(
    filter: CustomerOrderStatusReportFilter
  ): Observable<List<CustomerOrderStatusReport>> {
    return this.http.get<List<CustomerOrderStatusReport>>(
      API.CustomerOrderStatusReport,
      {
        params: {
          ...(filter.StartDate && {
            StartDate: String(
              moment(filter.StartDate).format('YYYY-MM-DD HH:mm:ss')
            ),
          }),
          ...(filter.EndDate && {
            EndDate: String(
              moment(filter.EndDate).format('YYYY-MM-DD HH:mm:ss')
            ),
          }),
          ...(filter.CustomerId && { CustomerId: filter.CustomerId }),
          ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
          ...(filter.PageSize && { PageSize: filter.PageSize }),
          ...(filter.StatusId && { StatusId: filter.StatusId }),
          ...(filter.TypeId && { TypeId: filter.TypeId }),
        },
      }
    );
  }

  AllProvidersWorkingTimeReport(
    filter: AllProvidersWorkingTimeReportFilter
  ): Observable<List<AllProvidersWorkingTimeReport>> {
    return this.http.get<List<AllProvidersWorkingTimeReport>>(
      API.AllProvidersWorkingTimeReport,
      {
        params: {
          ...(filter.StartDate && {
            StartDate: String(
              moment(filter.StartDate).format('YYYY-MM-DD HH:mm:ss')
            ),
          }),
          ...(filter.EndDate && {
            EndDate: String(
              moment(filter.EndDate).format('YYYY-MM-DD HH:mm:ss')
            ),
          }),
          ...(filter.IsActive && { IsActive: filter.IsActive }),
          ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
          ...(filter.PageSize && { PageSize: filter.PageSize }),
        },
      }
    );
  }

  CustomerWalletReport(
    filter: CustomerWalletReportFilter
  ): Observable<List<any>> {
    return this.http.get<List<any>>(API.CustomerWalletReport, {
      params: {
        ...(filter.StartDate && {
          StartDate: String(
            moment(filter.StartDate).format('YYYY-MM-DD HH:mm:ss')
          ),
        }),
        ...(filter.EndDate && {
          EndDate: String(moment(filter.EndDate).format('YYYY-MM-DD HH:mm:ss')),
        }),
        ...(filter.IsActive && { IsActive: filter.IsActive }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.PageSize && { PageSize: filter.PageSize }),
      },
    });
  }

  ProviderWalletReport(
    filter: ProviderWalletReportFilter
  ): Observable<List<any>> {
    return this.http.get<List<AllProvidersWorkingTimeReport>>(
      API.ProviderWalletReport,
      {
        params: {
          ...(filter.StartDate && {
            StartDate: String(
              moment(filter.StartDate).format('YYYY-MM-DD HH:mm:ss')
            ),
          }),
          ...(filter.EndDate && {
            EndDate: String(
              moment(filter.EndDate).format('YYYY-MM-DD HH:mm:ss')
            ),
          }),
          ...(filter.IsActive && { IsActive: filter.IsActive }),
          ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
          ...(filter.PageSize && { PageSize: filter.PageSize }),
        },
      }
    );
  }

  IgnoredOrderReport(filter: IgnoredOrderFilter): Observable<List<any>> {
    return this.http.get<List<AllProvidersWorkingTimeReport>>(
      API.IgnoredOrderReport,
      {
        params: {
          ...(filter.OrderType && { OrderType: filter.OrderType }),
          ...(filter.StartDate && {
            StartDate: String(
              moment(filter.StartDate).format('YYYY-MM-DD HH:mm:ss')
            ),
          }),
          ...(filter.EndDate && {
            EndDate: String(
              moment(filter.EndDate).format('YYYY-MM-DD HH:mm:ss')
            ),
          }),
          ...(filter.OrderId && { OrderId: filter.OrderId }),
          ...(filter.OrderStatus && { OrderStatus: +filter.OrderStatus }),
          // ...(filter.PageNumber && {PageNumber: filter.PageNumber}),
          // ...(filter.PageSize && {PageSize: filter.PageSize}),
        },
      }
    );
  }

  ProviderWalletManualAdditionReport(
    filter: ProviderWalletManualAdditionReport
  ): Observable<List<any>> {
    return this.http.get<List<any>>(API.ProviderWalletManualAdditionReport, {
      params: {
        ...(filter.StartDate && {
          StartDate: String(
            moment(filter.StartDate).format('YYYY-MM-DD HH:mm:ss')
          ),
        }),
        ...(filter.EndDate && {
          EndDate: String(moment(filter.EndDate).format('YYYY-MM-DD HH:mm:ss')),
        }),
        ...(filter.IsActive && { IsActive: filter.IsActive }),
        ...(filter.ProviderId && { ProviderId: filter.ProviderId }),
        ...(filter.ProviderName && { ProviderName: filter.ProviderName }),
        ...(filter.ProviderPhone && { ProviderPhone: filter.ProviderPhone }),
        ...(filter.RegisterType && { RegisterType: filter.RegisterType }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.TransactionType && {
          TransactionType: filter.TransactionType,
        }),
      },
    });
  }

  CustomerWalletManualAdditionReport(
    filter: CustomerWalletManualAdditionReport
  ): Observable<List<any>> {
    return this.http.get<List<any>>(API.CustomerWalletManualAdditionReport, {
      params: {
        ...(filter.StartDate && {
          StartDate: String(
            moment(filter.StartDate).format('YYYY-MM-DD HH:mm:ss')
          ),
        }),
        ...(filter.EndDate && {
          EndDate: String(moment(filter.EndDate).format('YYYY-MM-DD HH:mm:ss')),
        }),
        ...(filter.IsActive && { IsActive: filter.IsActive }),
        ...(filter.CustomerId && { CustomerId: filter.CustomerId }),
        ...(filter.CustomerName && { CustomerName: filter.CustomerName }),
        ...(filter.CustomerPhone && { CustomerPhone: filter.CustomerPhone }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.TransactionType && {
          TransactionType: filter.TransactionType,
        }),
      },
    });
  }

  getRewardsAndCompensation(
    filter: RewardCompensationFilter
  ): Observable<List<any>> {
    return this.http.get<List<any>>(API.RewardsAndCompensation, {
      params: {
        ...(filter.StartDate && {
          StartDate: String(
            moment(filter.StartDate).format('YYYY-MM-DD HH:mm:ss')
          ),
        }),
        ...(filter.EndDate && {
          EndDate: String(moment(filter.EndDate).format('YYYY-MM-DD HH:mm:ss')),
        }),
        ...(filter.ActionType && { ActionType: +filter.ActionType }),
        ...(filter.UserType && { UserType: +filter.UserType }),
        ...(filter.TransactionType && {
          TransactionType: +filter.TransactionType,
        }),
        ...(filter.UserId && { UserId: filter.UserId }),
        ...(filter.UserPhone && { UserPhone: filter.UserPhone }),
        ...(filter.UserName && { UserName: filter.UserName }),
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
      },
    });
  }

  DeliveryOrdersReport(
    filter: DeliveryOrderFilter
  ): Observable<List<ShopResturant>> {
    return this.http.get<List<ShopResturant>>(API.DeliveryOrdersReport, {
      params: {
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.ShopId && { ShopId: String(filter.ShopId) }),
        ...(filter.ProviderId && { ProviderId: String(filter.ProviderId) }),
        ...(filter.CustomerId && { CustomerId: String(filter.CustomerId) }),
        ...(filter.ShopBranchId && {
          ShopBranchId: String(filter.ShopBranchId),
        }),
        ...(filter.StatusId && { StatusId: String(filter.StatusId) }),
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

  AddedFromPaymentReport(
    filter: AddedFromPaymentReportFilter
  ): Observable<List<ShopResturant>> {
    return this.http.get<List<ShopResturant>>(API.AddedFromPaymentReport, {
      params: {
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.CustomerId && { CustomerId: String(filter.CustomerId) }),
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

  getShopProfitReport(filter: ShopProfitReportFilter): Observable<List<any>> {
    return this.http.get<List<any>>(API.ShopProfitReport, {
      params: {
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.ShopId && { ShopId: String(filter.ShopId) }),
        ...(filter.ShopBranchId && {
          ShopBranchId: String(filter.ShopBranchId),
        }),
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
  DeliveryOrderStatistics(): Observable<List<any>> {
    return this.http.get<List<any>>(API.DeliveryOrderStatistics);
  }
  NewOrdersReport(filter: any): Observable<List<any>> {
    return this.http.get<List<any>>(API.NewOrdersReport, {
      params: {
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.PageSize && { PageSize: filter.PageSize }),
      },
    });
  }
  AssignedOrdersReport(filter: any): Observable<List<any>> {
    return this.http.get<List<any>>(API.AssignedOrdersReport, {
      params: {
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.PageSize && { PageSize: filter.PageSize }),
      },
    });
  }
  OutForDeliveryOrdersReport(filter: any): Observable<List<any>> {
    return this.http.get<List<any>>(API.OutForDeliveryOrdersReport, {
      params: {
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.PageSize && { PageSize: filter.PageSize }),
      },
    });
  }
  DelayedNoDriverForOrdersReport(filter: any): Observable<List<any>> {
    return this.http.get<List<any>>(API.DelayedNoDriverForOrdersReport, {
      params: {
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.PageSize && { PageSize: filter.PageSize }),
      },
    });
  }
  DeliverdOrdersReport(filter: any): Observable<List<any>> {
    return this.http.get<List<any>>(API.DeliverdOrdersReport, {
      params: {
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.PageSize && { PageSize: filter.PageSize }),
      },
    });
  }
  NotPickedUpOrdersReport(filter: any): Observable<List<any>> {
    return this.http.get<List<any>>(API.NotPickedUpOrdersReport, {
      params: {
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.PageSize && { PageSize: filter.PageSize }),
      },
    });
  }
}
