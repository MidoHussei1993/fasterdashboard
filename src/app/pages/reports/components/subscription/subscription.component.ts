import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { List } from 'src/app/shared';
import { FormMode } from 'src/app/shared/constant/form-modes';
import { ListProfit } from 'src/app/shared/models/listProfirt';
import { Pagination } from 'src/app/shared/models/pagination';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { CoboneReport } from '../../model/cobone-report.model';
import { CoboneTransportFilter } from '../../model/cobone-transport-filter.model';
import { CoboneFilter } from '../../model/cobonefilter.model';
import { CoboneTrasport } from '../../model/cobonetrasport.model';
import { OrderFilter } from '../../model/deliverOrderStatusFilter.model';
import { DeliveryOrderStatus } from '../../model/deliveryOrder-status.model';
import { ShopFilter } from '../../model/shop-filter.model';
import { ShopResturant } from '../../model/shop.model';
import { IsubscriptionsProfitList, Subscription } from '../../model/Subscription.model';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  CoboneReport: Subscription = new Subscription()
  isubscriptionsProfitList:IsubscriptionsProfitList[]=[]
  titles:string[] = [
    'provider Name',
    'subscription Profit',
  ];
  properties:string[] = [
    'providerName',
    'subscriptionProfit',
  ];
  filter:ShopFilter;
  busyLoading:boolean = true;
  pagination:Pagination = new Pagination();
  activeTab:string = 'created';
  public get formMode(): typeof FormMode {
    return FormMode;
  }
  constructor(
    private reportServices: ReportsService,
    private router: Router,
    private swalService: SwalModalService,
    private route:ActivatedRoute
  ) {
   }

  ngOnInit(): void {
    this.filter = new ShopFilter();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getcobonetransport(this.filter);
  }

  getcobonetransport(filter:ShopFilter){
    this.busyLoading = true;
    let id = this.route.snapshot.params.id;
    this.reportServices.Subscription(filter).subscribe((res:ListProfit<Subscription>) =>{
      this.busyLoading = false;
      this.CoboneReport = res.data;
      this.isubscriptionsProfitList = this.CoboneReport.subscriptionsProfitList

      delete res.data;
      this.pagination = {...res}
    }, err =>{
      console.log(err);
      this.busyLoading = false;
    })
  }
  setPageSize(pageSize){
    if(pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getcobonetransport(this.filter);
  }

  setPageNumber(pageNumber:number){
    if(pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getcobonetransport(this.filter);
  }

   navigate(conboneObj:CoboneReport,type:FormMode){
    switch (type) {
      case this.formMode.Edit:
        this.router.navigate([`cobone-report/delivery/${conboneObj.id}`]);
        break;
        case this.formMode.View:
          this.router.navigate([`cobone-report/details/${conboneObj.id}`]);
          break;

      default:
        break;
    }
  }

}
